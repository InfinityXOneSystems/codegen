# codegen

A simple code generation utility for creating files from templates.

## Installation

```bash
npm install
```

## Usage

### As a CLI tool

```bash
# List available templates
npx codegen list

# Generate code from a template
npx codegen generate class.template --output MyClass.js --data '{"className":"MyClass"}'
```

### As a library

```javascript
const { Generator, TemplateEngine } = require('codegen');

// Create a generator instance
const generator = new Generator({
  templatesDir: './templates',
  outputDir: './output'
});

// Generate a file from a template
const outputPath = generator.generate('class.template', { className: 'MyClass' }, 'MyClass.js');
console.log(`Generated: ${outputPath}`);

// List available templates
const templates = generator.listTemplates();
console.log('Available templates:', templates);
```

## Template Syntax

Templates use `{{variable}}` placeholders that are replaced with values from the data object.

Example template (`class.template`):
```javascript
class {{className}} {
  constructor() {
    // Initialize your class here
  }
}

module.exports = {{className}};
```

## Development

### Run tests

```bash
npm test
```

## License

MIT