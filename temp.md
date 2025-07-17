❌ Bad Code:
```javascript
function sum() { return a + b; }
```

🔍 Issues:
* ❌ **Undefined Variables:** The variables `a` and `b` are not defined within the function's scope, nor are they passed
as parameters. This will lead to a `ReferenceError` in strict mode or attempt to access potentially undefined global
variables, which is a common source of bugs and unpredictable behavior.
* ❌ **Lack of Flexibility/Reusability:** The function currently cannot be used to sum arbitrary numbers, as `a` and `b`
are hardcoded or expected to exist in a higher scope. Functions should generally be self-contained and operate on their
inputs.

✅ Recommended Fix:
```javascript
/**
* Calculates the sum of two numbers.
* @param {number} a - The first number.
* @param {number} b - The second number.
* @returns {number} The sum of a and b.
*/
function sum(a, b) {
// Input validation (optional but good practice for robustness)
if (typeof a !== 'number' || typeof b !== 'number') {
console.warn('sum() received non-number arguments. Attempting coercion.');
// Or throw new TypeError('Both arguments must be numbers.');
}
return a + b;
}
```

💡 Improvements:
* ✔ **Parameters for Flexibility:** The function now accepts `a` and `b` as parameters, making it reusable for any two
numbers.
* ✔ **Clearer Scope:** Variables `a` and `b` are explicitly defined as function parameters, eliminating reliance on
global variables and improving code predictability.
* ✔ **Enhanced Readability & Documentation:** Added a JSDoc comment to explain the function's purpose, parameters, and
return type, which is crucial for maintainability and collaboration.
* ✔ **Optional Input Validation:** Included an example of how to add basic type checking to make the function more
robust, either by warning or throwing an error if non-number arguments are passed.