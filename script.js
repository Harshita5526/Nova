/* =========================
   NOVA PRODUCTS
========================= */

const products = [

    {
        id: 1,
        name: "Minimal Watch",
        category: "fashion",
        price: 2499,
        image: "assets/product1.jpg",
        badge: "Bestseller",
        description:
            "A clean everyday watch designed with a minimal dial and timeless silhouette."
    },

    {
        id: 2,
        name: "Classic Sneakers",
        category: "fashion",
        price: 3199,
        image: "assets/product2.jpg",
        badge: "New",
        description:
            "Minimal sneakers made for everyday movement, comfort and effortless styling."
    },

    {
        id: 3,
        name: "Wireless Headphones",
        category: "tech",
        price: 4599,
        image: "assets/product3.jpg",
        badge: "Popular",
        description:
            "Immersive wireless headphones with a modern design for music and everyday use."
    },

    {
        id: 4,
        name: "Modern Backpack",
        category: "lifestyle",
        price: 1899,
        image: "assets/product4.jpg",
        badge: "New",
        description:
            "A clean everyday backpack with enough space for work, college and travel."
    },

    {
        id: 5,
        name: "Premium Sunglasses",
        category: "fashion",
        price: 1799,
        image: "assets/product5.jpg",
        badge: "Trending",
        description:
            "A timeless pair of sunglasses with a modern frame and effortless look."
    },

    {
        id: 6,
        name: "Desk Speaker",
        category: "tech",
        price: 2799,
        image: "assets/product6.jpg",
        badge: "Popular",
        description:
            "A compact speaker designed to bring clean sound and modern style to your desk."
    },

    {
        id: 7,
        name: "Everyday Cap",
        category: "fashion",
        price: 899,
        image: "assets/product7.jpg",
        badge: "New",
        description:
            "A simple everyday cap with a relaxed fit and clean NOVA-inspired aesthetic."
    },

    {
        id: 8,
        name: "Travel Bottle",
        category: "lifestyle",
        price: 1299,
        image: "assets/product8.jpg",
        badge: "Essential",
        description:
            "A reusable bottle designed for work, workouts and everyday travel."
    },

    {
        id: 9,
        name: "Smart Desk Lamp",
        category: "tech",
        price: 2299,
        image: "assets/product9.jpg",
        badge: "New",
        description:
            "A modern desk lamp that adds functional lighting and character to your workspace."
    }

];


/* =========================
   STORAGE
========================= */

let cart = JSON.parse(localStorage.getItem("novaCart")) || [];

let favorites =
    JSON.parse(localStorage.getItem("novaFavorites")) || [];


/* =========================
   DOM
========================= */

const productsGrid =
    document.getElementById("productsGrid");

const favoriteCount =
    document.getElementById("favoriteCount");

const cartCount =
    document.getElementById("cartCount");

const favoriteDrawer =
    document.getElementById("favoriteDrawer");

const cartDrawer =
    document.getElementById("cartDrawer");

const overlay =
    document.getElementById("overlay");

const favoriteItems =
    document.getElementById("favoriteItems");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const searchInput =
    document.getElementById("searchInput");

const productResult =
    document.getElementById("productResult");

const productModal =
    document.getElementById("productModal");


/* =========================
   SAVE STORAGE
========================= */

function saveData() {

    localStorage.setItem(
        "novaCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "novaFavorites",
        JSON.stringify(favorites)
    );

}


/* =========================
   FORMAT PRICE
========================= */

function formatPrice(price) {

    return "₹" + price.toLocaleString("en-IN");

}


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts(list = products) {

    productsGrid.innerHTML = "";

    productResult.textContent =
        `${list.length} product${list.length !== 1 ? "s" : ""}`;


    if (list.length === 0) {

        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1; min-height:300px;">
                <strong>No products found</strong>
                <span>Try another search.</span>
            </div>
        `;

        return;
    }


    list.forEach(product => {

        const isFavorite =
            favorites.includes(product.id);


        const card = document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.src=''; this.parentElement.style.background='#d8d0c5';"
                >

                <span class="product-badge">
                    ${product.badge}
                </span>


                <button
                    class="product-heart ${isFavorite ? "active" : ""}"
                    onclick="toggleFavorite(${product.id})"
                >
                    ${isFavorite ? "♥" : "♡"}
                </button>


                <button
                    class="quick-view"
                    onclick="openProductModal(${product.id})"
                >
                    Quick View
                </button>

            </div>


            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3 class="product-name">
                    ${product.name}
                </h3>


                <div class="product-bottom">

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>


                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                        title="Add to cart"
                    >
                        +
                    </button>

                </div>

            </div>
        `;


        productsGrid.appendChild(card);

    });

}


/* =========================
   FAVORITES
========================= */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(item => item !== id);

    } else {

        favorites.push(id);

    }

    saveData();

    updateCounts();

    renderProducts();

    renderFavorites();

}


/* =========================
   RENDER FAVORITES
========================= */

function renderFavorites() {

    if (favorites.length === 0) {

        favoriteItems.innerHTML = `
            <div class="empty-state">
                <strong>No favorites yet</strong>
                <span>Tap ♡ on products you love.</span>
            </div>
        `;

        return;
    }


    favoriteItems.innerHTML = "";


    favorites.forEach(id => {

        const product =
            products.find(item => item.id === id);

        if (!product) return;


        const item =
            document.createElement("div");

        item.className = "favorite-item";


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="favorite-info">

                <h4>${product.name}</h4>

                <p>${formatPrice(product.price)}</p>

                <div class="item-actions">

                    <button
                        class="small-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="remove-btn"
                        onclick="toggleFavorite(${product.id})"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;


        favoriteItems.appendChild(item);

    });

}


/* =========================
   CART
========================= */

function addToCart(id) {

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }


    saveData();

    updateCounts();

    renderCart();

}


/* =========================
   REMOVE CART
========================= */

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    saveData();

    updateCounts();

    renderCart();

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;
    }


    saveData();

    renderCart();

    updateCounts();

}


/* =========================
   RENDER CART
========================= */

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-state">
                <strong>Your bag is empty</strong>
                <span>Add something beautiful.</span>
            </div>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(product => product.id === item.id);


        if (!product) return;


        const itemTotal =
            product.price * item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-info">

                <h4>${product.name}</h4>

                <p>
                    ${formatPrice(product.price)}
                </p>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${product.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${product.id}, 1)"
                    >
                        +
                    </button>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${product.id})"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        formatPrice(total);

}


/* =========================
   COUNTS
========================= */

function updateCounts() {

    favoriteCount.textContent =
        favorites.length;


    const totalQuantity =
        cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        );


    cartCount.textContent =
        totalQuantity;

}


/* =========================
   DRAWERS
========================= */

function openDrawer(drawer) {

    closeDrawers();

    drawer.classList.add("active");

    overlay.classList.add("active");

}


function closeDrawers() {

    favoriteDrawer.classList.remove("active");

    cartDrawer.classList.remove("active");

    overlay.classList.remove("active");

}


/* FAVORITE BUTTON */

document
    .getElementById("favoriteBtn")
    .addEventListener("click", () => {

        renderFavorites();

        openDrawer(favoriteDrawer);

    });


/* CART BUTTON */

document
    .getElementById("cartBtn")
    .addEventListener("click", () => {

        renderCart();

        openDrawer(cartDrawer);

    });


/* CLOSE BUTTONS */

document
    .getElementById("closeFavorite")
    .addEventListener("click", closeDrawers);


document
    .getElementById("closeCart")
    .addEventListener("click", closeDrawers);


overlay.addEventListener(
    "click",
    closeDrawers
);


/* =========================
   FILTERS
========================= */

document
    .querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                button.classList.add("active");


                const category =
                    button.dataset.category;


                if (category === "all") {

                    renderProducts(products);

                } else {

                    const filtered =
                        products.filter(
                            product =>
                                product.category === category
                        );

                    renderProducts(filtered);

                }

            }
        );

    });


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        const filtered =
            products.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(query)

                ||

                product.category
                    .toLowerCase()
                    .includes(query)

            );


        renderProducts(filtered);

    }
);


/* =========================
   PRODUCT MODAL
========================= */

let selectedProduct = null;


function openProductModal(id) {

    const product =
        products.find(item => item.id === id);


    if (!product) return;


    selectedProduct = product;


    document
        .getElementById("modalImage")
        .src = product.image;


    document
        .getElementById("modalImage")
        .alt = product.name;


    document
        .getElementById("modalCategory")
        .textContent =
            product.category;


    document
        .getElementById("modalName")
        .textContent =
            product.name;


    document
        .getElementById("modalPrice")
        .textContent =
            formatPrice(product.price);


    document
        .getElementById("modalDescription")
        .textContent =
            product.description;


    productModal.classList.add("active");

}


document
    .getElementById("modalClose")
    .addEventListener(
        "click",
        () => productModal.classList.remove("active")
    );


productModal.addEventListener(
    "click",
    event => {

        if (event.target === productModal) {

            productModal.classList.remove("active");

        }

    }
);


/* MODAL ADD TO CART */

document
    .getElementById("modalAddCart")
    .addEventListener(
        "click",
        () => {

            if (!selectedProduct) return;


            addToCart(selectedProduct.id);


            productModal.classList.remove("active");


            openDrawer(cartDrawer);

        }
    );


/* =========================
   CHECKOUT
========================= */

document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert("Your cart is empty.");

                return;

            }


            alert(
                "Checkout is ready to be connected with a payment gateway."
            );

        }
    );


/* =========================
   INITIAL LOAD
========================= */

renderProducts();

renderFavorites();

renderCart();

updateCounts();