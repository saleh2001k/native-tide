/**
 * Script to find and remove console.log statements from the codebase
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const sourceDir = path.resolve(__dirname, '../src');
const extensions = ['js', 'jsx', 'ts', 'tsx'];
const ignorePatterns = ['node_modules', 'build', 'dist', '.git'];

// Regular expression for console.log statements
const consoleLogRegex = /console\.log\s*\([^)]*\)\s*;?/g;

let totalFilesChecked = 0;
let totalFilesWithLogs = 0;
let totalLogsRemoved = 0;

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(consoleLogRegex);

    if (matches && matches.length > 0) {
      totalFilesWithLogs++;
      totalLogsRemoved += matches.length;

      console.log(`\n${filePath}:`);
      matches.forEach((match) => {
        console.log(`  - ${match.trim()}`);
      });

      // Replace the console.log statements
      const newContent = content.replace(
        consoleLogRegex,
        '// console.log removed',
      );

      // Write the file back
      fs.writeFileSync(filePath, newContent, 'utf8');
    }

    totalFilesChecked++;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Get all source files recursively
const pattern = `${sourceDir}/**/*.{${extensions.join(',')}}`;
const files = glob.sync(pattern, {
  ignore: ignorePatterns.map((p) => `**/${p}/**`),
});

console.log('Starting console.log removal...');
console.log(`Checking ${files.length} files in ${sourceDir}`);

files.forEach(processFile);

console.log('\nSummary:');
console.log(`Files checked: ${totalFilesChecked}`);
console.log(`Files with console.log statements: ${totalFilesWithLogs}`);
console.log(`Total console.log statements removed: ${totalLogsRemoved}`);

if (totalLogsRemoved > 0) {
  console.log('\nAll console.log statements have been commented out.');
  console.log('Please review the changes before committing.');
} else {
  console.log('\nNo console.log statements found. All clean!');
}
