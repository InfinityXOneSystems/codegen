const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const Generator = require('../src/generator');

describe('Generator', () => {
  const testTemplatesDir = path.join(__dirname, 'fixtures', 'templates');
  const testOutputDir = path.join(__dirname, 'fixtures', 'output');

  beforeEach(() => {
    // Create test directories
    if (!fs.existsSync(testTemplatesDir)) {
      fs.mkdirSync(testTemplatesDir, { recursive: true });
    }
    if (!fs.existsSync(testOutputDir)) {
      fs.mkdirSync(testOutputDir, { recursive: true });
    }
    // Create a test template
    fs.writeFileSync(path.join(testTemplatesDir, 'test.template'), 'Hello {{name}}!');
  });

  afterEach(() => {
    // Clean up test directories
    if (fs.existsSync(testOutputDir)) {
      fs.rmSync(testOutputDir, { recursive: true });
    }
    if (fs.existsSync(testTemplatesDir)) {
      fs.rmSync(testTemplatesDir, { recursive: true });
    }
  });

  it('should generate file from template', () => {
    const generator = new Generator({
      templatesDir: testTemplatesDir,
      outputDir: testOutputDir
    });
    
    const outputPath = generator.generate('test.template', { name: 'World' }, 'output.txt');
    
    assert.strictEqual(fs.existsSync(outputPath), true);
    assert.strictEqual(fs.readFileSync(outputPath, 'utf-8'), 'Hello World!');
  });

  it('should throw error for non-existent template', () => {
    const generator = new Generator({
      templatesDir: testTemplatesDir,
      outputDir: testOutputDir
    });
    
    assert.throws(() => {
      generator.generate('nonexistent.template', {}, 'output.txt');
    }, /Template not found/);
  });

  it('should list available templates', () => {
    const generator = new Generator({
      templatesDir: testTemplatesDir,
      outputDir: testOutputDir
    });
    
    const templates = generator.listTemplates();
    
    assert.strictEqual(templates.includes('test.template'), true);
  });

  it('should return empty array for non-existent templates directory', () => {
    const generator = new Generator({
      templatesDir: '/nonexistent/path',
      outputDir: testOutputDir
    });
    
    const templates = generator.listTemplates();
    
    assert.deepStrictEqual(templates, []);
  });
});
