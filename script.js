// Enhanced product data with more items
const products = [
    {
        id: 1,
        name: "Handcrafted Ceramic Vase",
        price: 2499.99,
        image: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg",
        category: "pottery",
        description: "Beautiful handcrafted ceramic vase with intricate patterns, perfect for home decoration.",
        artisan: "Priya Sharma"
    },
    {
        id: 2,
        name: "Artisan Silver Necklace",
        price: 3999.99,
        image: "D:\\programs\\website\\e-comerse site\\pictures\\Artisan Silver Necklace.jpg",
        category: "jewelry",
        description: "Elegant silver necklace with traditional Indian motifs, handcrafted by skilled artisans.",
        artisan: "Rajesh Kumar"
    },
    {
        id: 3,
        name: "Hand-woven Wool Blanket",
        price: 5999.99,
        image: "https://images.pexels.com/photos/4622424/pexels-photo-4622424.jpeg",
        category: "textiles",
        description: "Cozy hand-woven wool blanket with traditional patterns, perfect for cold nights.",
        artisan: "Maya Devi"
    },
    {
        id: 4,
        name: "Wooden Serving Board",
        price: 1999.99,
        image: "D:\\programs\\website\\e-comerse site\\pictures\\Wooden Serving Board.jpg",
        category: "woodwork",
        description: "Premium wooden serving board crafted from sustainable teak wood.",
        artisan: "Arjun Singh"
    },
    {
        id: 5,
        name: "Brass Decorative Bowl",
        price: 1499.99,
        image: "D:\\programs\\website\\e-comerse site\\pictures\\Brass Decorative Bowl.jpg",
        category: "pottery",
        description: "Traditional brass bowl with engraved designs, perfect for festivals and ceremonies.",
        artisan: "Sunita Joshi"
    },
    {
        id: 6,
        name: "Embroidered Silk Scarf",
        price: 2999.99,
        image: "D:\\programs\\website\\e-comerse site\\pictures\\Embroidered Silk Scarf.jpg",
        description: "Luxurious silk scarf with hand-embroidered floral patterns.",
        artisan: "Kavita Reddy"
    },
    {
        id: 7,
        name: "Silver Earrings Set",
        price: 1799.99,
        image: "https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg",
        category: "jewelry",
        description: "Elegant silver earrings with traditional jhumka design.",
        artisan: "Meera Patel"
    },
    {
        id: 8,
        name: "Carved Wooden Box",
        price: 2499.99,
        image: "D:\\programs\\website\\e-comerse site\\pictures\\Carved Wooden Box.jpg",
        category: "woodwork",
        description: "Intricately carved wooden jewelry box with multiple compartments.",
        artisan: "Vikram Yadav"
    }
];

// Artisans data
const artisans = [
    {
        id: 1,
        name: "Priya Sharma",
        specialty: "Pottery",
        image: "D:\\programs\\website\\e-comerse site\\pictures\\Priya Sharma.jpg",
        bio: "Master potter with 15 years of experience in traditional ceramic arts.",
        location: "Jaipur, Rajasthan"
    },
    {
        id: 2,
        name: "Rajesh Kumar",
        specialty: "Jewelry",
        image: "D:\\programs\\website\\e-comerse site\\pictures\\Rajesh Kumar.jpg",
        bio: "Third-generation silversmith specializing in traditional Indian jewelry.",
        location: "Jodhpur, Rajasthan"
    },
    {
        id: 3,
        name: "Maya Devi",
        specialty: "Textiles",
        image: "D:\\programs\\website\\e-comerse site\\pictures\\maya devi.jpg",
        bio: "Expert weaver known for her intricate patterns and natural dyes.",
        location: "Varanasi, Uttar Pradesh"
    },
    {
        id: 4,
        name: "Arjun Singh",
        specialty: "Woodwork",
        image: "D:\\programs\\website\\e-comerse site\\pictures\\Arjun Singh.jpg",
        bio: "Skilled woodcarver creating functional art from sustainable materials.",
        location: "Mysore, Karnataka"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('artisanCart')) || [];
let cartTotal = 0;
let currentPage = 'home';
let filteredProducts = [...products];

// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cart');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const featuredProducts = document.getElementById('featuredProducts');
const shopProducts = document.getElementById('shopProducts');
const artisansGrid = document.getElementById('artisansGrid');
const productModal = document.getElementById('productModal');
const checkoutModal = document.getElementById('checkoutModal');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayShopProducts();
    displayArtisans();
    setupEventListeners();
    updateCartDisplay();
    updateCartCount();
});

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('href').substring(1);
            navigateToPage(page);
        });
    });

    // Search functionality
    document.getElementById('searchToggle').addEventListener('click', toggleSearch);
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    // Cart functionality
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);

    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
    document.getElementById('closeCheckoutModal').addEventListener('click', closeCheckout);

    // Product modal
    document.getElementById('closeModal').addEventListener('click', closeProductModal);

    // Filters
    document.getElementById('categoryFilter')?.addEventListener('change', filterProducts);
    document.getElementById('sortFilter')?.addEventListener('change', sortProducts);

    // Forms
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
    document.getElementById('newsletterForm').addEventListener('submit', handleNewsletter);

    // Add to cart buttons (event delegation)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
        
        if (e.target.classList.contains('view-product')) {
            const productId = parseInt(e.target.dataset.id);
            openProductModal(productId);
        }
        
        if (e.target.classList.contains('remove-from-cart')) {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        }
        
        if (e.target.classList.contains('quantity-btn')) {
            const productId = parseInt(e.target.dataset.id);
            const action = e.target.dataset.action;
            updateQuantity(productId, action);
        }
    });

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            navigateToPage('shop');
            setTimeout(() => {
                document.getElementById('categoryFilter').value = category;
                filterProducts();
            }, 100);
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
        if (e.target === checkoutModal) closeCheckout();
    });
}

// Navigation functions
function navigateToPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = page;
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${page}`) {
                link.classList.add('active');
            }
        });
    }
}

// Search functionality
function toggleSearch() {
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        searchInput.focus();
    }
}

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
        navigateToPage('shop');
        displayShopProducts();
    }
}

// Product display functions
function displayProducts() {
    const featured = products.slice(0, 4);
    featuredProducts.innerHTML = featured.map(product => createProductCard(product)).join('');
}

function displayShopProducts() {
    shopProducts.innerHTML = filteredProducts.map(product => createProductCard(product, true)).join('');
}

function createProductCard(product, showViewButton = false) {
    return `
        <div class="product-card fade-in">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">₹${product.price.toFixed(2)}</p>
                <p class="product-artisan">by ${product.artisan}</p>
                <div class="product-actions">
                    ${showViewButton ? `<button class="view-product" data-id="${product.id}">View Details</button>` : ''}
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

// Artisans display
function displayArtisans() {
    artisansGrid.innerHTML = artisans.map(artisan => `
        <div class="artisan-card fade-in">
            <img src="${artisan.image}" alt="${artisan.name}" class="artisan-image">
            <div class="artisan-info">
                <h3>${artisan.name}</h3>
                <p class="artisan-specialty">${artisan.specialty}</p>
                <p class="artisan-location">📍 ${artisan.location}</p>
                <p class="artisan-bio">${artisan.bio}</p>
            </div>
        </div>
    `).join('');
}

// Filter and sort functions
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    filteredProducts = category === 'all' ? [...products] : products.filter(p => p.category === category);
    sortProducts();
}

function sortProducts() {
    const sortBy = document.getElementById('sortFilter').value;
    
    switch(sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    displayShopProducts();
}

// Product modal functions
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('modalContent').innerHTML = `
            <div class="product-modal-content">
                <img src="${product.image}" alt="${product.name}" class="modal-product-image">
                <div class="modal-product-info">
                    <h2>${product.name}</h2>
                    <p class="modal-price">₹${product.price.toFixed(2)}</p>
                    <p class="modal-artisan">Crafted by ${product.artisan}</p>
                    <p class="modal-description">${product.description}</p>
                    <button class="add-to-cart modal-add-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productModal.style.display = 'block';
    }
}

function closeProductModal() {
    productModal.style.display = 'none';
}

// Cart functions
function toggleCart() {
    cartSidebar.classList.toggle('open');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartDisplay();
        updateCartCount();
        saveCart();
        showAddToCartFeedback(productId);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartCount();
    saveCart();
}

function updateQuantity(productId, action) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }
        updateCartDisplay();
        updateCartCount();
        saveCart();
    }
}

function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                    </div>
                </div>
                <button class="remove-from-cart" data-id="${item.id}">×</button>
            </div>
        `).join('');
    }

    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `₹${cartTotal.toFixed(2)}`;
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

function saveCart() {
    localStorage.setItem('artisanCart', JSON.stringify(cart));
}

function showAddToCartFeedback(productId) {
    const button = document.querySelector(`button[data-id="${productId}"].add-to-cart`);
    if (button) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.backgroundColor = '#27ae60';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 1000);
    }
}

// Checkout functions
function openCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    document.getElementById('checkoutItems').innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} × ${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    document.getElementById('checkoutTotal').textContent = `₹${cartTotal.toFixed(2)}`;
    checkoutModal.style.display = 'block';
}

function closeCheckout() {
    checkoutModal.style.display = 'none';
}

function handleCheckout(e) {
    e.preventDefault();
    
    // Simulate order processing
    alert('Order placed successfully! You will receive a confirmation email shortly.');
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    updateCartCount();
    saveCart();
    
    // Close modals
    closeCheckout();
    toggleCart();
}

// Form handlers
function handleContactForm(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
}

function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    if (email) {
        alert('Thank you for subscribing to our newsletter!');
        e.target.reset();
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.classList.contains('nav-link')) return; // Skip navigation links
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize page on load
window.addEventListener('load', () => {
    // Add fade-in animation to elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('.product-card, .artisan-card, .category-card').forEach(el => {
        observer.observe(el);
    });
});