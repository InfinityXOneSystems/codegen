/**
 * Simple template engine that replaces {{variable}} placeholders with values
 */
class TemplateEngine {
  /**
   * Render a template string with the provided data
   * @param {string} template - Template string with {{variable}} placeholders
   * @param {Object} data - Key-value pairs for replacement
   * @returns {string} Rendered string
   */
  render(template, data = {}) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        return String(data[key]);
      }
      return match;
    });
  }
}

module.exports = TemplateEngine;
