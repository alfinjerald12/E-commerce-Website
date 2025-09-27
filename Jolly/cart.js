// Function to add an item to the cart
function addToCart(element) {
    const productCard = element.closest('.event-card');
    const productName = productCard.dataset.name;
    const productPrice = parseFloat(productCard.dataset.price);
    const productImage = productCard.dataset.image;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product is already in cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} has been added to your cart!`);
}

// Function to update the cart count in the header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'inline-block' : 'none';
    }
}

// Functions for the cart page (cart.html)
function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartBody = document.querySelector('.cart-body');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        if (cartBody) cartBody.style.display = 'none';
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        return;
    }

    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    if (cartItemsContainer) cartItemsContainer.innerHTML = '';

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        if (cartItemsContainer) {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">₹ ${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
                <p class="cart-item-total">₹ ${itemTotal.toFixed(2)}</p>
                <button class="cart-item-remove" onclick="removeItem(${index})">&times;</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        }
    });

    const cartSummary = document.querySelector('.cart-summary');
    if (cartSummary) {
        const shipping = subtotal < 0 ? 0.00 : 0; // Example shipping cost
        const total = subtotal + shipping;
        document.getElementById('subtotal').textContent = `₹ ${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `Free`;
        document.getElementById('total').textContent = `₹ ${total.toFixed(2)}`;
    }
}

function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // Remove item if quantity is 0 or less
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    // If we are on the cart page, display the items
    if (document.querySelector('.cart-container')) {
        displayCartItems();
    }
});