const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const sourceDir = '../';
const componentExtensions = ['jsx', 'tsx'];
const ignorePatterns = [
  '**/node_modules/**',
  '**/build/**',
  '**/dist/**',
  '**/.git/**',
];

// Structure patterns to check
const STRUCTURE_PATTERNS = {
  IMPORTS: {
    description: 'Imports should be at the top of the file',
    regex: /^(import|\/\/ @ts-ignore|\/\/ eslint-disable).+$/gm,
    check: (content, matches) => {
      if (!matches || matches.length === 0) return true;

      const lines = content.split('\n');
      let lastImportLine = 0;

      for (let i = 0; i < lines.length; i++) {
        if (
          lines[i].trim().match(/^(import|\/\/ @ts-ignore|\/\/ eslint-disable)/)
        ) {
          lastImportLine = i;
        }
      }

      // Check if there are imports after non-import lines
      for (let i = 0; i < lastImportLine; i++) {
        const line = lines[i].trim();
        if (
          line !== '' &&
          !line.match(
            /^(import|\/\/ @ts-ignore|\/\/ eslint-disable|\/\/|\/\*|\*\/|\*)/,
          )
        ) {
          return false;
        }
      }

      return true;
    },
  },

  COMPONENT_DECLARATION: {
    description:
      'Component should be declared using a named function or const arrow function',
    regex:
      /(export\s+(default\s+)?function\s+\w+|const\s+\w+\s*=\s*(\(|React\.memo|\w+\.memo|\w+\())/gm,
    check: (content, matches) => {
      return matches && matches.length > 0;
    },
  },

  TYPE_DECLARATIONS: {
    description: 'Type/interface declarations should be before the component',
    regex: /(type|interface)\s+\w+/gm,
    check: (content, matches) => {
      if (!matches || matches.length === 0) return true;

      const componentStartRegex =
        /(export\s+(default\s+)?function\s+\w+|const\s+\w+\s*=\s*(\(|React\.memo|\w+\.memo|\w+\())/m;
      const componentMatch = content.match(componentStartRegex);

      if (!componentMatch) return true;

      const componentStartIndex = content.indexOf(componentMatch[0]);

      for (const match of matches) {
        const typeIndex = content.indexOf(match);
        if (typeIndex > componentStartIndex) {
          return false;
        }
      }

      return true;
    },
  },

  PROP_DESTRUCTURING: {
    description:
      'Props should be destructured in function parameters or at the top of the component',
    regex:
      /(\(\s*\{\s*[\w\s,:]+\s*\}|\(\s*props\s*\).+const\s+\{\s*[\w\s,:]+\s*\}\s*=\s*props)/ms,
    check: (content, matches) => {
      if (!matches) return false;

      const hasPropsParam = content.match(/\(\s*props\s*\)/);
      if (hasPropsParam) {
        // Check if props are destructured
        const hasDestructuring = content.match(
          /const\s+\{\s*[\w\s,:]+\s*\}\s*=\s*props/,
        );
        return hasDestructuring !== null;
      }

      return matches.length > 0;
    },
  },

  RETURN_STATEMENT: {
    description: 'Component should have a return statement returning JSX',
    regex: /return\s*\(/ms,
    check: (content, matches) => {
      return matches && matches.length > 0;
    },
  },

  EXPORT_STATEMENT: {
    description: 'Component should be exported',
    regex: /export\s+(default|const|function)/m,
    check: (content, matches) => {
      return matches && matches.length > 0;
    },
  },

  STYLE_LOCATION: {
    description: 'Styles should be defined after the component',
    regex: /(const|let)\s+styles\s*=/m,
    check: (content, matches) => {
      if (!matches || matches.length === 0) return true;

      const componentRegex =
        /(export\s+(default\s+)?function\s+\w+|const\s+\w+\s*=\s*(\(|React\.memo|\w+\.memo|\w+\())/m;
      const componentMatch = content.match(componentRegex);

      if (!componentMatch) return true;

      const returnRegex = /return\s*\(/m;
      const returnMatch = content.match(returnRegex);

      if (!returnMatch) return true;

      const styleIndex = content.indexOf(matches[0]);
      const componentIndex = content.indexOf(componentMatch[0]);

      return styleIndex > componentIndex;
    },
  },
};

// Results tracking
const results = {
  totalFiles: 0,
  nonCompliantFiles: 0,
  componentsByDirectory: {},
  patternViolations: {},
  nonCompliantFileList: [],
};

// Initialize results object
Object.keys(STRUCTURE_PATTERNS).forEach((pattern) => {
  results.patternViolations[pattern] = {
    count: 0,
    files: [],
  };
});

function analyzeComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let isNonCompliant = false;

  // Check each pattern
  Object.entries(STRUCTURE_PATTERNS).forEach(([key, pattern]) => {
    const matches = content.match(pattern.regex);
    const isCompliant = pattern.check(content, matches);

    if (!isCompliant) {
      isNonCompliant = true;
      results.patternViolations[key].count++;
      results.patternViolations[key].files.push(filePath);
    }
  });

  if (isNonCompliant) {
    results.nonCompliantFiles++;
    results.nonCompliantFileList.push(filePath);
  }

  // Track by directory
  const dir = path.dirname(filePath);
  if (!results.componentsByDirectory[dir]) {
    results.componentsByDirectory[dir] = {
      total: 0,
      compliant: 0,
      nonCompliant: 0,
    };
  }

  results.componentsByDirectory[dir].total++;
  if (isNonCompliant) {
    results.componentsByDirectory[dir].nonCompliant++;
  } else {
    results.componentsByDirectory[dir].compliant++;
  }

  return isNonCompliant;
}

function printResults() {
  console.log('\n=============================================');
  console.log('🧩 COMPONENT STRUCTURE ANALYSIS RESULTS');
  console.log('=============================================');
  console.log(`Total component files analyzed: ${results.totalFiles}`);
  console.log(
    `Components with structure issues: ${results.nonCompliantFiles} (${Math.round((results.nonCompliantFiles / results.totalFiles) * 100)}%)`,
  );

  console.log('\n📊 RESULTS BY PATTERN:');
  Object.entries(STRUCTURE_PATTERNS).forEach(([key, pattern]) => {
    const violationCount = results.patternViolations[key].count;
    const violationRate = Math.round(
      (violationCount / results.totalFiles) * 100,
    );

    console.log(`\n${key}:`);
    console.log(`  Pattern: ${pattern.description}`);
    console.log(`  Violations: ${violationCount} (${violationRate}%)`);
  });

  console.log('\n📁 RESULTS BY DIRECTORY:');
  Object.entries(results.componentsByDirectory).forEach(([dir, stats]) => {
    const complianceRate = Math.round((stats.compliant / stats.total) * 100);
    const relativePath = path.relative(process.cwd(), dir);

    console.log(`\n${relativePath}:`);
    console.log(`  Total components: ${stats.total}`);
    console.log(`  Compliant: ${stats.compliant} (${complianceRate}%)`);
    console.log(
      `  Non-compliant: ${stats.nonCompliant} (${100 - complianceRate}%)`,
    );
  });

  if (results.nonCompliantFiles > 0) {
    console.log('\n❌ NON-COMPLIANT COMPONENTS:');

    // Group violations by component file
    const componentViolations = {};

    Object.entries(results.patternViolations).forEach(([pattern, data]) => {
      data.files.forEach((file) => {
        if (!componentViolations[file]) {
          componentViolations[file] = [];
        }
        componentViolations[file].push(pattern);
      });
    });

    Object.entries(componentViolations).forEach(([file, patterns]) => {
      const relativePath = path.relative(process.cwd(), file);
      console.log(`\n${relativePath}:`);
      patterns.forEach((pattern) => {
        console.log(`  - ${STRUCTURE_PATTERNS[pattern].description}`);
      });
    });
  }

  console.log('\n✅ RECOMMENDATIONS:');
  console.log('- Create a component template following best practices');
  console.log('- Consider using a code generator for new components');
  console.log(
    '- Fix violations in existing components, prioritizing the most common patterns',
  );

  // Identify most common violations
  const sortedPatterns = Object.entries(results.patternViolations)
    .sort((a, b) => b[1].count - a[1].count)
    .filter(([_, data]) => data.count > 0)
    .slice(0, 3);

  if (sortedPatterns.length > 0) {
    console.log('\n🔍 TOP VIOLATIONS TO ADDRESS:');
    sortedPatterns.forEach(([pattern, data]) => {
      console.log(
        `- ${STRUCTURE_PATTERNS[pattern].description} (${data.count} components)`,
      );
    });
  }
}

// Find component files
const filePatterns = componentExtensions.map(
  (ext) => `${sourceDir}/**/*.${ext}`,
);
const files = glob.sync(filePatterns, { ignore: ignorePatterns });

console.log('Analyzing component structure...');
console.log(`Scanning ${files.length} component files`);

files.forEach((file) => {
  // Only process files that look like components
  if (path.basename(file).match(/^[A-Z][a-zA-Z0-9]*/)) {
    results.totalFiles++;
    analyzeComponent(file);
  }
});

printResults();
