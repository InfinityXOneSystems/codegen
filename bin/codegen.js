#!/usr/bin/env node

const { Generator } = require('../src');

const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
  console.log(`
codegen - A simple code generation utility

Usage:
  codegen <command> [options]

Commands:
  list                    List available templates
  generate <template>     Generate code from a template
  help                    Show this help message

Options:
  --templates-dir <dir>   Directory containing templates (default: ./templates)
  --output-dir <dir>      Output directory (default: ./output)
  --output <file>         Output file name
  --data <json>           JSON data for template variables

Examples:
  codegen list
  codegen generate class.template --output MyClass.js --data '{"className":"MyClass"}'
`);
}

function parseArgs(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--templates-dir' && args[i + 1]) {
      options.templatesDir = args[++i];
    } else if (args[i] === '--output-dir' && args[i + 1]) {
      options.outputDir = args[++i];
    } else if (args[i] === '--output' && args[i + 1]) {
      options.output = args[++i];
    } else if (args[i] === '--data' && args[i + 1]) {
      try {
        options.data = JSON.parse(args[++i]);
      } catch {
        console.error('Error: Invalid JSON data');
        process.exit(1);
      }
    }
  }
  return options;
}

try {
  if (!command || command === 'help') {
    printHelp();
    process.exit(0);
  }

  const options = parseArgs(args);
  const generator = new Generator({
    templatesDir: options.templatesDir,
    outputDir: options.outputDir
  });

  if (command === 'list') {
    const templates = generator.listTemplates();
    if (templates.length === 0) {
      console.log('No templates found.');
    } else {
      console.log('Available templates:');
      templates.forEach(t => console.log(`  - ${t}`));
    }
  } else if (command === 'generate') {
    const templateName = args[1];
    if (!templateName) {
      console.error('Error: Template name required');
      process.exit(1);
    }
    if (!options.output) {
      console.error('Error: Output file name required (--output)');
      process.exit(1);
    }
    const outputPath = generator.generate(templateName, options.data || {}, options.output);
    console.log(`Generated: ${outputPath}`);
  } else {
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
