'use strict';

/**
 * article-highlight service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article-highlight.article-highlight');
