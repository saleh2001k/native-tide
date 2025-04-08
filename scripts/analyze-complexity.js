const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const sourceDir = '../';
const extensions = ['js', 'jsx', 'ts', 'tsx'];
const ignorePatterns = [
  '**/node_modules/**',
  '**/build/**',
  '**/dist/**',
  '**/.git/**',
];

// Complexity thresholds
const COMPLEXITY = {
  FILE_SIZE: {
    WARNING: 300, // lines
    CRITICAL: 500, // lines
  },
  FUNCTION_SIZE: {
    WARNING: 30, // lines
    CRITICAL: 50, // lines
  },
  NESTING_DEPTH: {
    WARNING: 3,
    CRITICAL: 5,
  },
  TERNARY_OPERATORS: {
    WARNING: 2, // per function
    CRITICAL: 4, // per function
  },
};

// Results tracking
const results = {
  totalFiles: 0,
  complexFiles: 0,
  largeFiles: 0,
  highNestingFiles: 0,
  ternaryHeavyFiles: 0,
  complexFunctions: 0,
  fileDetails: {},
};

// Regular expressions
const functionRegex =
  /(?:function\s+\w+\s*\(|const\s+\w+\s*=\s*(?:async\s*)?\(|\w+\s*:\s*(?:async\s*)?\(|(?:async\s*)?\([^)]*\)\s*=>)/g;
const ternaryRegex = /\?[\s\S]*?:/g;
const nestingRegexes = [
  /if\s*\(/g,
  /else\s*{/g,
  /for\s*\(/g,
  /while\s*\(/g,
  /switch\s*\(/g,
  /\{\s*$/g, // opening bracket at end of line
];

function countNestingDepth(content) {
  const lines = content.split('\n');
  let maxDepth = 0;
  let currentDepth = 0;

  for (const line of lines) {
    // Count opening brackets that increase nesting
    let openCount = 0;
    for (const regex of nestingRegexes) {
      const matches = line.match(regex);
      if (matches) openCount += matches.length;
    }

    // Count closing brackets that decrease nesting
    const closeCount = (line.match(/\}/g) || []).length;

    // Update current depth
    currentDepth += openCount - closeCount;
    maxDepth = Math.max(maxDepth, currentDepth);
  }

  return maxDepth;
}

function extractFunctions(content) {
  const functions = [];
  const lines = content.split('\n');
  let currentFunction = null;
  let bracketCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line contains function definition
    if (!currentFunction && functionRegex.test(line)) {
      currentFunction = {
        name: line.trim(),
        startLine: i + 1,
        content: line,
        bracketCount:
          (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length,
      };
      bracketCount = currentFunction.bracketCount;
    } else if (currentFunction) {
      currentFunction.content += '\n' + line;
      bracketCount +=
        (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;

      if (bracketCount === 0) {
        currentFunction.endLine = i + 1;
        currentFunction.lineCount =
          currentFunction.endLine - currentFunction.startLine + 1;

        // Count ternary operators
        const ternaryMatches =
          currentFunction.content.match(ternaryRegex) || [];
        currentFunction.ternaryCount = ternaryMatches.length;

        // Calculate nesting depth for the function
        currentFunction.nestingDepth = countNestingDepth(
          currentFunction.content,
        );

        functions.push(currentFunction);
        currentFunction = null;
      }
    }
  }

  return functions;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const lineCount = lines.length;

  // Extract functions
  const functions = extractFunctions(content);

  // Calculate max nesting depth in the file
  const nestingDepth = countNestingDepth(content);

  // Count total ternary operators in file
  const ternaryMatches = content.match(ternaryRegex) || [];
  const ternaryCount = ternaryMatches.length;

  // Check if file is large
  const isLargeFile = lineCount >= COMPLEXITY.FILE_SIZE.WARNING;
  const isCriticalSizeFile = lineCount >= COMPLEXITY.FILE_SIZE.CRITICAL;

  // Check if file has high nesting
  const hasHighNesting = nestingDepth >= COMPLEXITY.NESTING_DEPTH.WARNING;
  const hasCriticalNesting = nestingDepth >= COMPLEXITY.NESTING_DEPTH.CRITICAL;

  // Check if file has many ternary operators
  const hasManyTernaries = ternaryCount >= COMPLEXITY.TERNARY_OPERATORS.WARNING;

  // Complex functions
  const complexFunctions = functions.filter(
    (fn) =>
      fn.lineCount >= COMPLEXITY.FUNCTION_SIZE.WARNING ||
      fn.nestingDepth >= COMPLEXITY.NESTING_DEPTH.WARNING ||
      fn.ternaryCount >= COMPLEXITY.TERNARY_OPERATORS.WARNING,
  );

  // Update global results
  if (isLargeFile) results.largeFiles++;
  if (hasHighNesting) results.highNestingFiles++;
  if (hasManyTernaries) results.ternaryHeavyFiles++;
  results.complexFunctions += complexFunctions.length;

  const isComplex =
    isLargeFile ||
    hasHighNesting ||
    hasManyTernaries ||
    complexFunctions.length > 0;
  if (isComplex) {
    results.complexFiles++;

    results.fileDetails[filePath] = {
      lineCount,
      nestingDepth,
      ternaryCount,
      isLargeFile,
      isCriticalSizeFile,
      hasHighNesting,
      hasCriticalNesting,
      hasManyTernaries,
      complexFunctions: complexFunctions.map((fn) => ({
        name: fn.name.length > 50 ? fn.name.substring(0, 50) + '...' : fn.name,
        lines: fn.lineCount,
        nestingDepth: fn.nestingDepth,
        ternaries: fn.ternaryCount,
        startLine: fn.startLine,
      })),
    };
  }

  return isComplex;
}

function printResults() {
  console.log('\n=============================================');
  console.log('📊 CODE COMPLEXITY ANALYSIS RESULTS');
  console.log('=============================================');
  console.log(`Total files analyzed: ${results.totalFiles}`);
  console.log(
    `Files with complexity issues: ${results.complexFiles} (${Math.round((results.complexFiles / results.totalFiles) * 100)}%)`,
  );
  console.log(
    `Large files (>${COMPLEXITY.FILE_SIZE.WARNING} lines): ${results.largeFiles}`,
  );
  console.log(
    `High nesting files (depth >${COMPLEXITY.NESTING_DEPTH.WARNING}): ${results.highNestingFiles}`,
  );
  console.log(`Files with many ternaries: ${results.ternaryHeavyFiles}`);
  console.log(`Complex functions identified: ${results.complexFunctions}`);

  if (results.complexFiles > 0) {
    console.log('\n📑 DETAILED FILE ANALYSIS:');

    Object.entries(results.fileDetails).forEach(([file, details]) => {
      const relativePath = path.relative(process.cwd(), file);
      const complexity = [];

      if (details.isCriticalSizeFile) complexity.push('🔴 CRITICAL SIZE');
      else if (details.isLargeFile) complexity.push('🟠 LARGE FILE');

      if (details.hasCriticalNesting) complexity.push('🔴 CRITICAL NESTING');
      else if (details.hasHighNesting) complexity.push('🟠 HIGH NESTING');

      if (details.hasManyTernaries) complexity.push('🟠 MANY TERNARIES');

      console.log(`\n${relativePath} - ${complexity.join(', ')}`);
      console.log(
        `  Lines: ${details.lineCount}, Max nesting: ${details.nestingDepth}, Ternaries: ${details.ternaryCount}`,
      );

      if (details.complexFunctions.length > 0) {
        console.log('  Complex functions:');
        details.complexFunctions.forEach((fn) => {
          console.log(`  - ${fn.name} (Line ${fn.startLine})`);
          console.log(
            `    Lines: ${fn.lines}, Nesting: ${fn.nestingDepth}, Ternaries: ${fn.ternaries}`,
          );
        });
      }
    });
  }

  console.log('\n✅ RECOMMENDATIONS:');
  if (results.largeFiles > 0) {
    console.log(
      '- Consider breaking down large files into smaller, focused modules',
    );
  }
  if (results.highNestingFiles > 0) {
    console.log(
      '- Reduce nesting depth by extracting code into helper functions',
    );
    console.log(
      '- Consider using early returns to flatten nested conditionals',
    );
  }
  if (results.complexFunctions > 0) {
    console.log(
      '- Break complex functions into smaller, more focused functions',
    );
    console.log(
      '- Consider functional patterns like map/filter/reduce instead of loops where appropriate',
    );
  }
  if (results.ternaryHeavyFiles > 0) {
    console.log(
      '- Consider using more readable if/else or switch statements instead of complex ternaries',
    );
  }
}

// Get all source files
const filePatterns = extensions.map((ext) => `${sourceDir}/**/*.${ext}`);
const files = glob.sync(filePatterns, { ignore: ignorePatterns });

console.log('Analyzing code complexity...');
console.log(`Scanning ${files.length} files for complexity issues`);

files.forEach((file) => {
  results.totalFiles++;
  analyzeFile(file);
});

printResults();
