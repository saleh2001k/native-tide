/**
 * Script to find and suggest fixes for inline arrow functions in JSX
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const sourceDir = path.resolve(__dirname, '../src');
const extensions = ['js', 'jsx', 'ts', 'tsx'];
const ignorePatterns = ['node_modules', 'build', 'dist', '.git'];

// Regular expression for inline arrow functions in JSX (a simplified version)
const inlineArrowFuncRegex =
  /(\w+)={[ ]*\(\) ?=>|(\w+)={[ ]*\([\w, {}\[\]]+\) ?=>|(\w+)={[ ]*[\w]+ ?=>|(\w+)={(?:[ ]*function[ ]*\([\w, {}\[\]]*\))/g;

let totalFilesChecked = 0;
let totalFilesWithInlineFunc = 0;
let totalInlineFuncFound = 0;

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(inlineArrowFuncRegex);

    if (matches && matches.length > 0) {
      totalFilesWithInlineFunc++;
      totalInlineFuncFound += matches.length;

      console.log(`\n${filePath}:`);
      matches.forEach((match) => {
        const propName = match.split('=')[0];
        console.log(`  - Found inline function in prop: ${match.trim()}`);
        // Here we're not automatically fixing but suggesting a pattern
        console.log(
          `    Suggestion: Create a handler method like 'handle${propName.charAt(0).toUpperCase() + propName.slice(1)}' instead.`,
        );
      });
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

console.log('Starting inline function detection...');
console.log(`Checking ${files.length} files in ${sourceDir}`);

files.forEach(processFile);

console.log('\nSummary:');
console.log(`Files checked: ${totalFilesChecked}`);
console.log(`Files with inline functions in JSX: ${totalFilesWithInlineFunc}`);
console.log(`Total inline functions found: ${totalInlineFuncFound}`);

if (totalInlineFuncFound > 0) {
  console.log(
    '\nInline functions found. Please follow the suggestions above to create proper handler methods.',
  );
  console.log('A typical refactoring pattern:');
  console.log(`
  // BEFORE
  <Button onPress={() => handleAction(item)} />
  
  // AFTER
  const handleButtonPress = React.useCallback(() => {
    handleAction(item);
  }, [item]);
  
  <Button onPress={handleButtonPress} />
  `);
} else {
  console.log('\nNo inline functions found in JSX props. All clean!');
}
