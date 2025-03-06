const API_BASE_URL = "https://dl4cljo0fb.execute-api.ap-south-1.amazonaws.com"; // Replace with your API Gateway URL

// Load products when page loads
async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error loading products. Please check your API.");
    }
}

// Display Products
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">
            <p>${product.name} - ₹${product.price}</p>
            <button onclick="addToCart('${product.product_id}', '${product.name}', ${product.price}, '${product.image_url}')">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

// Add to Cart Function
async function addToCart(product_id, name, price, image_url) {
    try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: "user123",  // Replace with actual user ID
                product_id: product_id,
                name: name,
                price: price,
                image_url: image_url,
                quantity: 1
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to add item to cart: ${response.status}`);
        }

        const data = await response.json();
        alert(data.message);  // Show success message

    } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Error adding item to cart. Please try again.");
    }
}

window.onload = loadProducts;
