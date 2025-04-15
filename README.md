
# AAF Framework

# Install all dependencies which are mentioned in package.json
npm install

# install browsers
npx playwright install

# Command to see what all are the browsers installed
npx playwright install --list

Available browsers: Output
chromium (installed)
firefox (installed)
webkit (installed)

# To find playwright version
npx playwright --version

# run
npx playwright test

# Run headed mode
npx playwright test --headed

# run particular browser (default chromium, can mention firefox and webkit)
npx playwright test --project=chromium --headed

# To Show playwright report
npx playwright show-report

# Run test in ui mode
npx playwright test --ui

# Run parallel from command prompt, can configure in playwright.config.js file also
npx playwright test --workers=2

# Run Parallel with chromium with head mode and allow Playwright to run tests in parallel at both the test and spec levels
npx playwright test --project=chromium --headed --workers=4

# Pass spec file as parameter
npx playwright test ./tests/demo-todo-app.spec.js --headed

# Pass thread count from cli
npx playwright test ./tests/testExamples/Alerts.spec.js --headed --workers=4

npx playwright test ./tests/testExamples/Alerts.spec.js --headed

# Pass retries from cli
npx playwright test --retries=1

npx playwright test ./tests --headed --workers=1

# Groups in Playwright
npx playwright test ./tests/testExamples/Tags.spec.js --headed -g @sanity


# In Playwright, test.only is used to focus on a specific test, meaning only that particular test will be executed,
test.only



# good site to play with different object
https://www.lambdatest.com/selenium-playground/




# The difference between 
`const { LoginPage } = require('../../pages/storePages/LoginPage');` and 
`import { LoginPage } from '../../pages/storePages/LoginPage';` lies in the module systems they use and their syntax.

### `require` Syntax
- **CommonJS Module System**: This is used primarily in Node.js.
- **Dynamic Loading**: Modules can be loaded dynamically at runtime.
- **Syntax**:
  ```javascript
  const { LoginPage } = require('../../pages/storePages/LoginPage');
  ```

### `import` Syntax
- **ES6 Module System**: This is part of the ECMAScript 2015 (ES6) standard and is used in modern JavaScript environments, including browsers and Node.js (with appropriate configuration).
- **Static Loading**: Modules are loaded statically at compile time.
- **Syntax**:
  ```javascript
  import { LoginPage } from '../../pages/storePages/LoginPage';
  ```


# **✅ Running Tests with Groups with Logical Operators**

### **1️⃣ Run Tests That Belong to Both `sanity` AND `reg`**
To run tests that contain **both** `@sanity` and `@reg` (like `test5`):
```sh
npx playwright test --grep "@sanity.*@reg|@reg.*@sanity"
```
🔹 This regex pattern ensures that both `@sanity` and `@reg` exist in the test name.

---
### **2️⃣ Run Tests That Belong to `sanity` OR `reg` (Any One)**
To run **all `sanity` and `reg` tests** together:
```sh
npx playwright test --grep "@sanity|@reg"
```
🔹 This runs any test containing `@sanity` OR `@reg`.

---
### **3️⃣ Run Only `sanity` but NOT `reg`**
To run tests that have `@sanity` **but NOT `@reg`**:
```sh
npx playwright test --grep "@sanity" --grep-invert "@reg"
```
🔹 This will **exclude** any test that has `@reg`.

---
### **4️⃣ Run Tests That Belong to `sanity` AND NOT `reg`**
To run tests that contain `@sanity` but **do NOT** have `@reg`:
```sh
npx playwright test --grep "@sanity(?!.*@reg)"
```
🔹 `@sanity(?!.*@reg)` ensures `@sanity` exists but `@reg` does NOT.

---
### **5️⃣ Run Tests That Belong to `reg` AND NOT `sanity`**
To run tests that contain `@reg` but **do NOT** have `@sanity`:
```sh
npx playwright test --grep "@reg(?!.*@sanity)"
```



# Running a specific describe block using --grep:


test.describe('Group 1', () => {
  test('Test 1', async ({ page }) => {
    // Test code for Group 1
  });
});

test.describe('Group 2', () => {
  test('Test 3', async ({ page }) => {
    // Test code for Group 2
  });

  test('Test 4', async ({ page }) => {
    // Test code for Group 2
  });
});

npx playwright test --grep "Group 2"


# Hooks

Yes, you can write these hooks in a global setup and teardown file to avoid repeating them in every spec file.you can create a helper file that contains these hooks and import it into your spec files.

### Step-by-Step Solution

1. **Create a Helper File for Hooks:**

Create a file named `hooks.js` (or any name you prefer) in your project directory.

```javascript
// hooks.js
import { test } from '@playwright/test';

test.beforeAll(async () => {
  console.log('this is beforeAll Hook......');
});

test.afterAll(async () => {
  console.log('this is afterAll Hook......');
});

test.beforeEach(async () => {
  console.log('this is beforeEach Hook......');
});

test.afterEach(async () => {
  console.log('this is afterEach Hook......');
});
```

2. **Import the Hooks in Your Test Files:**

In each of your test files, import the hooks file to apply the hooks.

```javascript
// Grouping.spec.js
import './hooks';
import { test, expect } from '@playwright/test';

test.describe('Group 2', () => {
  test('Test3', async ({ page }) => {
    console.log('this is test 3....');
  });

  test('Test4', async ({ page }) => {
    console.log('this is test 4....');
  });
});
```

### Summary

By creating a `hooks.js` file and importing it into your test files, you can define your hooks once and reuse them across multiple test files. This approach ensures that the hooks are applied consistently without needing to repeat the code in every spec file.