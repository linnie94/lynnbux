// Global variables
let cart = [];
let currentTip = 0;
let tipPercentage = 0;

// Google Sheets configuration
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwbgIkheLppcsrmRzs62z4A472YXHZOg-K2cl7Z1lk3HlcpOV8eRv6QwPCHuSNZCnUeOA/exec';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateDisplay();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Menu item add buttons
    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const name = menuItem.dataset.name;
            const price = parseFloat(menuItem.dataset.price);
            addToCart(name, price);
        });
    });

    // Tip buttons
    document.querySelectorAll('.tip-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tip buttons
            document.querySelectorAll('.tip-btn').forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Calculate tip
            tipPercentage = parseFloat(this.dataset.tip);
            calculateTip();
            
            // Clear custom tip input
            document.getElementById('custom-tip-input').value = '';
        });
    });

    // Custom tip input
    document.getElementById('custom-tip-input').addEventListener('input', function() {
        // Remove active class from all percentage buttons
        document.querySelectorAll('.tip-btn').forEach(btn => btn.classList.remove('active'));
        
        // Set custom tip
        currentTip = parseFloat(this.value) || 0;
        tipPercentage = 0;
        updateDisplay();
    });

    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length > 0) {
            checkout();
        }
    });
}

// Add item to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateDisplay();
}

// Remove item from cart
function removeFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    updateDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price.toFixed(2)} each</span>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="removeFromCart('${item.name}')">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="addToCart('${item.name}', ${item.price})">+</button>
            </div>
        </div>
    `).join('');
}

// Calculate subtotal
function calculateSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Calculate tip
function calculateTip() {
    const subtotal = calculateSubtotal();
    currentTip = subtotal * tipPercentage;
    updateDisplay();
}

// Update all displays
function updateDisplay() {
    updateCartDisplay();
    
    const subtotal = calculateSubtotal();
    const total = subtotal + currentTip;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tip-amount').textContent = `$${currentTip.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    // Enable/disable checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled = cart.length === 0;
}

// Checkout function
async function checkout() {
    const subtotal = calculateSubtotal();
    const total = subtotal + currentTip;
    
    const orderData = {
        items: cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity
        })),
        subtotal: subtotal,
        tip: currentTip,
        total: total,
        timestamp: new Date().toISOString()
    };
    
    try {
        // Send data to Google Sheets
        await sendToGoogleSheets(orderData);
        
        // Show success message
        alert(`Order completed successfully!\nTotal: $${total.toFixed(2)}\nThank you for your purchase!`);
        
        // Reset cart
        cart = [];
        currentTip = 0;
        tipPercentage = 0;
        
        // Clear custom tip input
        document.getElementById('custom-tip-input').value = '';
        
        // Remove active class from tip buttons
        document.querySelectorAll('.tip-btn').forEach(btn => btn.classList.remove('active'));
        
        // Update display
        updateDisplay();
        
    } catch (error) {
        console.error('Error processing order:', error);
        alert('There was an error processing your order. Please try again.');
    }
}

// Send data to Google Sheets (Working version with no-cors)
async function sendToGoogleSheets(orderData) {
    if (!GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        console.log('Google Sheets URL not configured. Order data:', orderData);
        return;
    }
    
    try {
        console.log('Sending order data to Google Sheets:', orderData);
        
        // Using no-cors mode for Google Apps Script (this is the standard approach)
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors', // This is required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        // With no-cors mode, we can't read the response, but the request will be sent
        // Google Apps Script will process it in the background
        console.log('Order sent to Google Sheets (no-cors mode)');
        
        // Wait a moment to ensure the request is processed
        await new Promise(resolve => setTimeout(resolve, 1000));
        
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        throw error;
    }
}

// Utility functions for testing
function clearCart() {
    cart = [];
    currentTip = 0;
    tipPercentage = 0;
    document.getElementById('custom-tip-input').value = '';
    document.querySelectorAll('.tip-btn').forEach(btn => btn.classList.remove('active'));
    updateDisplay();
}

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        calculateSubtotal,
        calculateTip,
        clearCart
    };
}
