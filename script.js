// // Get the products container and the products wrapper
// const productsContainer = document.querySelector('.products-container');
// const productsWrapper = document.querySelector('.products-wrapper');

// // Get the add-to-cart buttons
// const addToCartButtons = document.querySelectorAll('.add-to-cart');

// // Add event listeners to the add-to-cart buttons
// addToCartButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     alert('Product added to cart!');
//   });
//   const cartContainer = document.querySelector(".cart-container");

// // Add a click event listener to each "Add to Cart" button
// addToCartButtons.forEach(function(button) {
//   button.addEventListener("click", function() {
//     // Get the product details from the clicked button's parent element
//     const product = this.parentNode;
//     const productName = product.querySelector("h3").textContent;
//     const productPrice = product.querySelector(id="price").textContent;

//     // Create a new cart item element and add it to the cart container
//     const cartItem = document.createElement("div");
//     cartItem.classList.add("cart-item");
//     cartItem.innerHTML = `
//       <p>${productName}</p>
//       <p>${productPrice}</p>
//     `;
//     cartContainer.appendChild(cartItem);

//     // Update the cart count in the header
//     const cartCount = document.querySelector(".cart-count");
//     cartCount.textContent = parseInt(cartCount.textContent) + 1;

//     // Save the cart item to local storage
//     const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     cartItems.push({
//       name: productName,
//       price: productPrice
//     });
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   });
// });

// // Populate the cart page with items from local storage
// const cartPageItems = document.querySelector(".cart-page-items");
// const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
// cartItems.forEach(function(item) {
//   const cartItem = document.createElement("div");
//   cartItem.classList.add("cart-item");
//   cartItem.innerHTML = `
//     <p>${item.name}</p>
//     <p>${item.price}</p>
//   `;
//   cartPageItems.appendChild(cartItem);
// });

// productsContainer.addEventListener('mouseup', () => {
//   isDown = false;
// });


// });

// // Scroll the products container horizontally
// let isDown = false;
// let startX;
// let scrollLeft;

// productsContainer.addEventListener('mousedown', (e) => {
//   isDown = true;
//   startX = e.pageX - productsContainer.offsetLeft;
//   scrollLeft = productsContainer.scrollLeft;
// });

// productsContainer.addEventListener('mouseleave', () => {
//   isDown = false;
// });
// cart.js

document.addEventListener('DOMContentLoaded', function () {
  // Get all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  // Add a click event listener to each "Add to Cart" button
  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Get the product details from the clicked button's parent element
      const product = this.parentNode;
      let productName = button.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
      let productPrice = button.previousElementSibling.textContent.replace("Rs","");
      let product_id=button.getAttribute('data-product-id');
      // Make an API request to add the product to the cart
      addToCartViaAPI(product_id,productName, productPrice);
      fetch("/api/get-cart-items")
  .then(response => {
    if (response.ok) {
      return response.json(); // Parse the response JSON
    } else {
      throw new Error('Failed to fetch data');
    }
  })
  .then(cartData => {
    const cartCount = document.querySelector("#cart-count");
 cartCount.textContent = parseInt(cartData.length) + 1;
  });
});
  });




// ...

  window.onload = function() {
    fetch("/api/get-cart-items")
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse the response JSON
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .then(cartData => {
      const cartCount = document.querySelector("#cart-count");
   cartCount.textContent = parseInt(cartData.length)+1;
    });
  };
  function addToCartViaAPI(productId, productName, productPrice) {
    // Replace this URL with your actual API endpoint for adding products to the cart
    const apiUrl = `http://localhost:4000/api/add-to-cart?product_id=${productId}`;

    // Make a POST request to the API to add the product to the cart
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type based on your API's requirements
        // Add any other headers as needed
      },
      body: JSON.stringify({
        productId: productId, // Replace with your actual data
        productName: productName,
        productPrice: productPrice,
      }),
      // You may need to include headers and a request body if required by your API
    })
      .then(response => {
        if (response.ok) {
          alert('Product added to cart successfully');
        } else {
          alert('Failed to add product to cart');
        }
      })
      .catch(error => {
        console.error('API request error:', error);
      });
  }
});
