const products = [
    {
        id: 1,
        name: "Reversible Jacket",
        description: "Reversible jacket with two styles.",
        price: 150.00,
        image: "images./jackets.jpg"
    },
    {
        id: 2,
        name: "Emily Jacket",
        description: "Water resistant Jacket.",
        price: 89.99,
        image: "images./jackets.2.avif"
    },
    {
        id: 3,
        name: "The S Jacket",
        description: "Classic St patrick's Jacket.",
        price: 180.00,
        image: "images./Jackets.3.jpg"
    },
    {
        id: 4,
        name: "THE ST PATRICK'S FESTIVAL JACKET",
        description: "Limited edition festival jacket.",
        price: 200.00,
        image: "images./Jackets.webp"
    }
];

const productsSection = document.getElementById('products');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
// Apply background colors for layout
document.body.style.background = 'linear-gradient(135deg, #39FF14 0%, #FFF700 50%, #FF69B4 100%)';
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckout = document.getElementById('close-checkout');
const checkoutForm = document.getElementById('checkout-form');
const orderSuccess = document.getElementById('order-success');

let cart = [];

function renderProducts() {
    // Set products section background to white and title area to green
    productsSection.innerHTML = `<div class="product-list">` + products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div>$${product.price.toFixed(2)}</div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('') + `</div>`;
}

window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCartCount();
}

function updateCartCount() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

cartBtn.onclick = function() {
    renderCart();
    cartModal.classList.remove('hidden');
}
closeCart.onclick = function() {
    cartModal.classList.add('hidden');
}

function renderCart() {
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
        cartTotal.textContent = '';
        checkoutBtn.style.display = 'none';
        return;
    }
    cartItemsList.innerHTML = cart.map(item => `
        <li>
            ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </li>
    `).join('');
    cartTotal.textContent = 'Total: $' + cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
    checkoutBtn.style.display = 'inline-block';
}

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    renderCart();
}

checkoutBtn.onclick = function() {
    cartModal.classList.add('hidden');
    checkoutModal.classList.remove('hidden');
    orderSuccess.classList.add('hidden');
    // Removed checkoutForm.reset() from here to avoid resetting while hidden
}
closeCheckout.onclick = function() {
    checkoutModal.classList.add('hidden');
}

checkoutForm.onsubmit = function(e) {
    e.preventDefault();
    cart = [];
    updateCartCount();
    checkoutForm.style.display = 'none';
    orderSuccess.classList.remove('hidden');
    setTimeout(() => {
        checkoutModal.classList.add('hidden');
        checkoutForm.style.display = 'block';
        orderSuccess.classList.add('hidden');
        checkoutForm.reset();
    }, 2000);
}

renderProducts();