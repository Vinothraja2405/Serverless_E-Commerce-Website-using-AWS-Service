const API_BASE_URL = ""; // Replace with your API Gateway URL
const USER_ID = "user123"; // Replace with actual user ID if needed;

// Fetch Cart Items
async function loadCart() {
    const response = await fetch(`${API_BASE_URL}/cart?user_id=${USER_ID}`);
    const cartItems = await response.json();
    displayCart(cartItems);
}

// Display Cart Items
function displayCart(cartItems) {
    const cartList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = "";
    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;
        const cartElement = document.createElement("div");
        cartElement.classList.add("cart-item");
        cartElement.innerHTML = `
            <img src="${item.image_url}" alt="${item.name}">
            <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
            <button onclick="editCartItem('${item.item_id}', ${item.quantity + 1})">+</button>
            <button onclick="editCartItem('${item.item_id}', ${item.quantity - 1})">-</button>
            <button onclick="deleteCartItem('${item.item_id}')">❌</button>
        `;
        cartList.appendChild(cartElement);
    });

    cartTotal.innerText = total;
}

// Edit Cart Item (Increase/Decrease Quantity)
async function editCartItem(itemId, quantity) {
    if (quantity < 1) return deleteCartItem(itemId);

    await fetch(`${API_BASE_URL}/cart/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: USER_ID,
            item_id: itemId,
            quantity: quantity
        })
    });
    loadCart();
}

// Delete Cart Item API Call
async function deleteCartItem(itemId) {
    await fetch(`${API_BASE_URL}/cart/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: USER_ID,
            item_id: itemId
        })
    });
    loadCart();
}

// Load Cart on Page Load
window.onload = function () {
    loadCart();
};
