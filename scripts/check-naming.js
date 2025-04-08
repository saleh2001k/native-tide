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

// Naming conventions
const CONVENTIONS = {
  COMPONENT_FILES: {
    pattern: /^[A-Z][a-zA-Z0-9]*\.(jsx|tsx)$/,
    description:
      'Component files should be PascalCase and use .jsx or .tsx extension',
    check: (file) => {
      // Only check files in component-like directories
      return (
        file.includes('/components/') ||
        file.includes('/screens/') ||
        file.includes('/views/') ||
        file.includes('/pages/')
      );
    },
  },
  UTIL_FILES: {
    pattern: /^[a-z][a-zA-Z0-9]*(\.[a-z]+)*\.(js|ts)$/,
    description:
      'Utility files should be camelCase and use .js or .ts extension',
    check: (file) => {
      return (
        file.includes('/utils/') ||
        file.includes('/helpers/') ||
        file.includes('/lib/') ||
        file.includes('/services/')
      );
    },
  },
  HOOK_FILES: {
    pattern: /^use[A-Z][a-zA-Z0-9]*\.(js|ts)$/,
    description:
      'Hook files should start with "use" followed by PascalCase and use .js or .ts extension',
    check: (file) => {
      return file.includes('/hooks/');
    },
  },
  TEST_FILES: {
    pattern: /^.+\.(test|spec)\.(js|jsx|ts|tsx)$/,
    description: 'Test files should end with .test.js or .spec.js',
    check: (file) => {
      return (
        file.includes('/tests/') ||
        file.includes('/__tests__/') ||
        file.endsWith('.test.js') ||
        file.endsWith('.test.ts') ||
        file.endsWith('.test.jsx') ||
        file.endsWith('.test.tsx') ||
        file.endsWith('.spec.js') ||
        file.endsWith('.spec.ts') ||
        file.endsWith('.spec.jsx') ||
        file.endsWith('.spec.tsx')
      );
    },
  },
  TYPE_FILES: {
    pattern: /^[a-z][a-zA-Z0-9]*(\.[a-z]+)*\.d\.ts$/,
    description: 'Type definition files should use .d.ts extension',
    check: (file) => {
      return file.endsWith('.d.ts');
    },
  },
  CONSTANT_FILES: {
    pattern: /^[A-Z][A-Z0-9_]*\.(js|ts)$/,
    description:
      'Constants files should be UPPER_CASE and use .js or .ts extension',
    check: (file) => {
      return file.includes('/constants/');
    },
  },
  INDEX_FILES: {
    pattern: /^index\.(js|jsx|ts|tsx)$/,
    description:
      'Index files should be named index.js, index.jsx, index.ts, or index.tsx',
    check: (file) => {
      return path.basename(file).startsWith('index.');
    },
  },
};

// Results tracking
const results = {
  totalFiles: 0,
  nonCompliantFiles: 0,
  filesByConvention: {},
  nonCompliantFileList: [],
};

// Initialize results object
Object.keys(CONVENTIONS).forEach((convention) => {
  results.filesByConvention[convention] = {
    total: 0,
    compliant: 0,
    nonCompliant: 0,
  };
});

function checkFile(filePath) {
  const fileName = path.basename(filePath);
  let isChecked = false;
  let isNonCompliant = false;

  // Check each convention
  Object.entries(CONVENTIONS).forEach(([key, convention]) => {
    // Check if file should be checked against this convention
    if (convention.check(filePath)) {
      isChecked = true;
      results.filesByConvention[key].total++;

      // Check if file complies with the convention
      if (!convention.pattern.test(fileName)) {
        results.filesByConvention[key].nonCompliant++;
        isNonCompliant = true;

        results.nonCompliantFileList.push({
          filePath,
          fileName,
          convention: key,
          description: convention.description,
        });
      } else {
        results.filesByConvention[key].compliant++;
      }
    }
  });

  if (isNonCompliant) {
    results.nonCompliantFiles++;
  }

  return isChecked;
}

function printResults() {
  console.log('\n=============================================');
  console.log('📋 FILE NAMING CONVENTION CHECK RESULTS');
  console.log('=============================================');
  console.log(`Total files analyzed: ${results.totalFiles}`);
  console.log(`Files not following conventions: ${results.nonCompliantFiles}`);

  console.log('\n📊 RESULTS BY CONVENTION:');
  Object.entries(CONVENTIONS).forEach(([key, convention]) => {
    const stats = results.filesByConvention[key];
    const complianceRate =
      stats.total > 0
        ? Math.round((stats.compliant / stats.total) * 100)
        : 'N/A';

    console.log(`\n${key}:`);
    console.log(`  Convention: ${convention.description}`);
    console.log(`  Total files: ${stats.total}`);
    console.log(`  Compliant: ${stats.compliant}`);
    console.log(`  Non-compliant: ${stats.nonCompliant}`);
    console.log(
      `  Compliance rate: ${complianceRate === 'N/A' ? complianceRate : complianceRate + '%'}`,
    );
  });

  if (results.nonCompliantFiles > 0) {
    console.log('\n❌ NON-COMPLIANT FILES:');

    // Group by convention
    const byConvention = {};
    results.nonCompliantFileList.forEach((item) => {
      if (!byConvention[item.convention]) {
        byConvention[item.convention] = [];
      }
      byConvention[item.convention].push(item);
    });

    Object.entries(byConvention).forEach(([convention, files]) => {
      console.log(`\n${convention} (${files.length} files):`);
      console.log(`  Convention: ${CONVENTIONS[convention].description}`);

      files.forEach((file) => {
        const relativePath = path.relative(process.cwd(), file.filePath);
        console.log(`  - ${relativePath}`);
      });
    });
  }

  console.log('\n✅ RECOMMENDATIONS:');
  if (results.nonCompliantFiles > 0) {
    console.log('- Rename files to follow the naming conventions');
    console.log(
      '- Consider using ESLint rules like eslint-plugin-unicorn/filename-case to enforce conventions',
    );
    console.log(
      '- Add this script to your CI/CD pipeline to prevent non-compliant file names',
    );
  } else {
    console.log('- Great job! All files follow naming conventions');
  }
}

// Get all source files
const filePatterns = extensions.map((ext) => `${sourceDir}/**/*.${ext}`);
const files = glob.sync(filePatterns, { ignore: ignorePatterns });

console.log('Checking file naming conventions...');
console.log(`Scanning ${files.length} files`);

files.forEach((file) => {
  results.totalFiles++;
  checkFile(file);
});

printResults();
