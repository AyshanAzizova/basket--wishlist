document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const goToWishlistButtons = document.querySelectorAll(".add-to-wishlist");
  
    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });

    goToWishlistButtons.forEach(button => {
        button.addEventListener("click", addToWishlist);
    });

    function addToCart(event) {
        const card = event.target.closest(".card");
        const itemId = card.getAttribute("data-id");
        const itemName = card.querySelector("h3").textContent;
        const itemPrice = parseFloat(card.querySelector("p").textContent.replace("$", ""));
        addToCartUI(itemId, itemName, itemPrice);
    }

    function addToWishlist(event) {
        const card = event.target.closest(".card");
        const itemId = card.getAttribute("data-id");
        const itemName = card.querySelector("h3").textContent;
        const itemPrice = parseFloat(card.querySelector("p").textContent.replace("$", ""));
        addToWishlistStorage(itemId, itemName, itemPrice);
    }

    function addToCartUI(itemId, itemName, itemPrice) {
        const cartItems = document.getElementById("cart-items");
        const cartTotalPrice = document.getElementById("total-price");
        const cartCount = document.getElementById("cart-count");

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <span>${itemName}</span>
            <span>$${itemPrice.toFixed(2)}</span>
            <button class="remove-item">Remove</button>
        `;
        cartItems.appendChild(cartItem);

        const totalPrice = parseFloat(cartTotalPrice.textContent);
        cartTotalPrice.textContent = (totalPrice + itemPrice).toFixed(2);

        const count = parseInt(cartCount.textContent);
        cartCount.textContent = count + 1;

        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach(button => {
            button.addEventListener("click", removeItem);
        });
    }

    function removeItem(event) {
        const item = event.target.closest(".cart-item");
        const itemName = item.querySelector("span").textContent;
        const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.replace("$", ""));
        const cartTotalPrice = document.getElementById("total-price");
        const cartCount = document.getElementById("cart-count");

        item.remove();

        const totalPrice = parseFloat(cartTotalPrice.textContent);
        cartTotalPrice.textContent = (totalPrice - itemPrice).toFixed(2);

        const count = parseInt(cartCount.textContent);
        cartCount.textContent = count - 1;
    }

    const deleteAllButton = document.getElementById("delete-all");
    deleteAllButton.addEventListener("click", deleteAll);

    function deleteAll() {
        const cartItems = document.getElementById("cart-items");
        const cartTotalPrice = document.getElementById("total-price");
        const cartCount = document.getElementById("cart-count");

        cartItems.innerHTML = "";
        cartTotalPrice.textContent = "0";
        cartCount.textContent = "0";
    }

    function addToWishlistStorage(itemId, itemName, itemPrice) {
        const wishlistItem = {
            id: itemId,
            name: itemName,
            price: itemPrice
        };
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist.push(wishlistItem);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    const wishlistItemsContainer = document.getElementById("wishlist-items");

    // Wishlist verilerini localStorage'dan al
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Wishlist için HTML içeriğini oluştur
    let wishlistHTML = "";
    wishlist.forEach(item => {
        wishlistHTML += `
            <div class="wishlist-item">
            <img class="checkout-image" src=${item.image} alt="">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            </div>
        `;
    });

    // Oluşturulan HTML içeriğini wishlist container'a ekle
    wishlistItemsContainer.innerHTML = wishlistHTML;

    // Toplam fiyatı hesapla ve göster
    const totalPrice = wishlist.reduce((total, item) => total + item.price, 0);
    document.getElementById("total-price").textContent = "$" + totalPrice.toFixed(2);
});
console.log(localStorage.getItem("wishlist"));
