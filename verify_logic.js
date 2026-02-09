
const assert = require('assert');

// Mock localStorage
const localStorage = {
    store: {},
    getItem: function (key) {
        return this.store[key] || null;
    },
    setItem: function (key, value) {
        this.store[key] = value.toString();
    },
    clear: function () {
        this.store = {};
    }
};

// Function attempting to replicate CartService constructor logic
function initCart() {
    let cart;
    try {
        const stored = JSON.parse(localStorage.getItem('cart'));
        cart = Array.isArray(stored) ? stored : [];
    } catch (e) {
        cart = [];
    }
    return cart;
}

// Test cases
console.log('Running verification tests for CartService initialization logic...');

// 1. LocalStorage empty
localStorage.clear();
let cart = initCart();
assert(Array.isArray(cart), 'Cart should be an array when localStorage is empty');
assert.strictEqual(cart.length, 0, 'Cart should be empty when localStorage is empty');
console.log('Test 1 Passed: Empty localStorage handled correctly.');

// 2. LocalStorage has valid array
localStorage.setItem('cart', JSON.stringify([{ id: 1, quantity: 2 }]));
cart = initCart();
assert(Array.isArray(cart), 'Cart should be an array');
assert.strictEqual(cart.length, 1, 'Cart should have 1 item');
assert.strictEqual(cart[0].id, 1, 'Item ID should match');
console.log('Test 2 Passed: Valid array loaded correctly.');

// 3. LocalStorage has non-array JSON (simulate the bug cause/fix target)
localStorage.setItem('cart', JSON.stringify({ items: [] })); // Object instead of array
cart = initCart();
assert(Array.isArray(cart), 'Cart should be an array even if localStorage has object');
assert.strictEqual(cart.length, 0, 'Cart should reset to empty array if stored data is not an array');
console.log('Test 3 Passed: Non-array JSON handled (reset to empty array).');

// 4. LocalStorage has invalid JSON
localStorage.store['cart'] = 'invalid-json}';
cart = initCart();
assert(Array.isArray(cart), 'Cart should be an array on JSON parse error');
assert.strictEqual(cart.length, 0, 'Cart should be empty on JSON parse error');
console.log('Test 4 Passed: Invalid JSON handled (reset to empty array).');

console.log('All logic verification tests passed!');
