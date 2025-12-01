const { describe, it } = require('node:test');
const assert = require('node:assert');
const TemplateEngine = require('../src/template-engine');

describe('TemplateEngine', () => {
  it('should replace single variable', () => {
    const engine = new TemplateEngine();
    const result = engine.render('Hello {{name}}!', { name: 'World' });
    assert.strictEqual(result, 'Hello World!');
  });

  it('should replace multiple variables', () => {
    const engine = new TemplateEngine();
    const result = engine.render('{{greeting}} {{name}}!', { greeting: 'Hello', name: 'World' });
    assert.strictEqual(result, 'Hello World!');
  });

  it('should keep unmatched placeholders', () => {
    const engine = new TemplateEngine();
    const result = engine.render('Hello {{name}}!', {});
    assert.strictEqual(result, 'Hello {{name}}!');
  });

  it('should handle empty template', () => {
    const engine = new TemplateEngine();
    const result = engine.render('', { name: 'World' });
    assert.strictEqual(result, '');
  });

  it('should handle empty data', () => {
    const engine = new TemplateEngine();
    const result = engine.render('No variables here');
    assert.strictEqual(result, 'No variables here');
  });

  it('should convert non-string values to strings', () => {
    const engine = new TemplateEngine();
    const result = engine.render('Count: {{count}}', { count: 42 });
    assert.strictEqual(result, 'Count: 42');
  });
});
