const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.article.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.article });
  },

  async find(ctx) {
    const { page = 1, pageSize = 3 } = ctx.query

    const data = await strapi.services.article.find({
      _limit: pageSize,
      _start: (page - 1) * pageSize
    })

    const totalData = await strapi.services.article.count()
    const totalPages = Math.ceil(totalData / pageSize)
    const hasNextPage = page < totalPages
    const hasPreviousPage = page > 1

    return {
      data,
      pagination: {
        totalData,
        totalPages,
        currentPage: parseInt(page),
        hasNextPage,
        hasPreviousPage,
        limit: pageSize
      }
    }
  },

};
