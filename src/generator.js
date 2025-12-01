const fs = require('fs');
const path = require('path');
const TemplateEngine = require('./template-engine');

/**
 * Code generator class that handles file generation from templates
 */
class Generator {
  /**
   * Create a new Generator instance
   * @param {Object} options - Generator options
   * @param {string} options.templatesDir - Directory containing templates
   * @param {string} options.outputDir - Output directory for generated files
   */
  constructor(options = {}) {
    this.templatesDir = options.templatesDir || path.join(process.cwd(), 'templates');
    this.outputDir = options.outputDir || path.join(process.cwd(), 'output');
    this.templateEngine = new TemplateEngine();
  }

  /**
   * Generate a file from a template
   * @param {string} templateName - Name of the template file
   * @param {Object} data - Data to pass to the template
   * @param {string} outputFileName - Name of the output file
   * @returns {string} Path to the generated file
   */
  generate(templateName, data, outputFileName) {
    const templatePath = path.join(this.templatesDir, templateName);
    
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templatePath}`);
    }

    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const generatedContent = this.templateEngine.render(templateContent, data);

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    const outputPath = path.join(this.outputDir, outputFileName);
    fs.writeFileSync(outputPath, generatedContent, 'utf-8');

    return outputPath;
  }

  /**
   * List available templates
   * @returns {string[]} Array of template names
   */
  listTemplates() {
    if (!fs.existsSync(this.templatesDir)) {
      return [];
    }
    
    return fs.readdirSync(this.templatesDir).filter(file => {
      const filePath = path.join(this.templatesDir, file);
      return fs.statSync(filePath).isFile();
    });
  }
}

module.exports = Generator;
