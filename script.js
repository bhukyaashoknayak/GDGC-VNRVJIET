const URL = "https://fakestoreapi.com/products";
let cart = [];
let totalMRP = 0;

function truncateTitle(title) {
    const words = title.split(' ');
    return words.length > 4 ? words.slice(0, 4).join(' ') + '...' : title;
}

async function fetchProducts(url) {
    let items = document.querySelector('.items');
    try {
        let response = await fetch(url);
        let resultData = await response.json();
        
        for (let i = 4; i <9; i++) {
            let result = resultData[i];
            let truncatedTitle = truncateTitle(result.title);
            
            items.innerHTML += `
            <div class="items_details">
                <img src="${result.image}" alt="${result.category}" class="prod_img">
                <p>${truncatedTitle}</p>
                <h4><i class="fa-solid fa-star"></i>${result.rating.rate}</h4>
                <h4>$${result.price.toFixed(2)}</h4>
                <button class="add-to-cart" data-id="${result.id}" data-price="${result.price}">Add to Cart</button>
            </div>
            `;
        }

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });

    } catch (err) {
        console.log(err);
    }
}

function addToCart(event) {
    const button = event.target;  
    const productId = button.getAttribute('data-id');
    const productPrice = parseFloat(button.getAttribute('data-price')); 
    cart.push({ id: productId, price: productPrice });
    totalMRP += productPrice-5;

    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    document.getElementById('total-amount').textContent = totalMRP.toFixed(2);
}

fetchProducts(URL);
