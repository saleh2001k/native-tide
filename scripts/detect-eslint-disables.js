/**
 * Script to find all eslint-disable comments in the codebase
 * This helps maintain code quality by keeping track of places where ESLint rules are disabled
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const sourceDir = '../'; // Set to your source directory
const extensions = ['js', 'jsx', 'ts', 'tsx'];
const ignorePatterns = [
  '**/node_modules/**',
  '**/build/**',
  '**/dist/**',
  '**/.git/**',
];

// Regular expressions to match eslint-disable comments
const eslintDisableRegexes = [
  /\/\*\s*eslint-disable\s*(.*)?\*\//g, // /* eslint-disable */
  /\/\/\s*eslint-disable\s*(.*)?$/gm, // // eslint-disable
  /\/\*\s*eslint-disable-next-line\s*(.*)?\*\//g, // /* eslint-disable-next-line */
  /\/\/\s*eslint-disable-next-line\s*(.*)?$/gm, // // eslint-disable-next-line
  /\/\*\s*eslint-disable-line\s*(.*)?\*\//g, // /* eslint-disable-line */
  /\/\/\s*eslint-disable-line\s*(.*)?$/gm, // // eslint-disable-line
];

let totalFiles = 0;
let filesWithDisables = 0;
let totalDisables = 0;
const disabledRules = {};

// Process each file
function processFile(filePath) {
  const contents = fs.readFileSync(filePath, 'utf8');
  let fileHasDisable = false;
  let fileDisables = 0;

  eslintDisableRegexes.forEach((regex) => {
    let match;
    while ((match = regex.exec(contents)) !== null) {
      if (!fileHasDisable) {
        fileHasDisable = true;
        filesWithDisables++;
        console.log(`\n${filePath}:`);
      }

      totalDisables++;
      fileDisables++;

      // Get line number of the match
      const lineNumber = contents.substring(0, match.index).split('\n').length;
      const disableComment = match[0].trim();
      console.log(`  Line ${lineNumber}: ${disableComment}`);

      // Extract specific rules if present
      if (match[1]) {
        const rules = match[1].trim().split(/\s*,\s*/);
        rules.forEach((rule) => {
          if (rule) {
            disabledRules[rule] = (disabledRules[rule] || 0) + 1;
          }
        });
      } else {
        // If no specific rule, count as "all"
        disabledRules.all = (disabledRules.all || 0) + 1;
      }
    }
  });

  if (fileHasDisable) {
    console.log(`  Total disables in file: ${fileDisables}`);
  }

  return fileHasDisable;
}

// Get all files matching the pattern
const filePatterns = extensions.map((ext) => `${sourceDir}/**/*.${ext}`);
const files = glob.sync(filePatterns, { ignore: ignorePatterns });

console.log('Scanning for ESLint disable comments...\n');

files.forEach((file) => {
  totalFiles++;
  processFile(file);
});

// Print summary
console.log('\n📊 Summary:');
console.log(`Total files scanned: ${totalFiles}`);
console.log(`Files with ESLint disables: ${filesWithDisables}`);
console.log(`Total ESLint disable occurrences: ${totalDisables}`);

if (Object.keys(disabledRules).length > 0) {
  console.log('\n🚫 Disabled rules:');
  const sortedRules = Object.entries(disabledRules).sort((a, b) => b[1] - a[1]);
  sortedRules.forEach(([rule, count]) => {
    console.log(`  ${rule}: ${count} times`);
  });
}

console.log(
  '\n📝 Note: Consider reviewing these disables to ensure they are necessary.',
);
