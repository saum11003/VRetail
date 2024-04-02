/*// Add event listener to all "Add to Cart" buttons
let addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get product information
    let productName = button.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    let productPrice = button.previousElementSibling.textContent;
    let productQuantity = 1;

    // Check if item already exists in cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
      // Increment quantity if item already exists
      existingItem.quantity++;
    } else {
      // Add new item to cart if it doesn't exist
      cart.push({ name: productName, price: productPrice, quantity: productQuantity });
    }

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update Cart page link
    let cartLink = document.querySelector('.cart a');
    let cartTotal = cart.reduce((total, item) => total + item.quantity, 0);
    cartLink.textContent = `Cart (${cartTotal})`;
  });
});
*/
window.addEventListener('load', getCartData);
function getCartData(){
fetch("/api/get-cart-items")
  .then(response => {
    if (response.ok) {
      return response.json(); // Parse the response JSON
    } else {
      throw new Error('Failed to fetch data');
    }
  })
  .then(cartData => {
    // Handle the cart data here
    console.log('Cart Data:', cartData);
    let cartTable = document.getElementById('cartTable');
let cartTotal = 0;
cartData.forEach(item => {
  let row = document.createElement('tr');
  let nameCell = document.createElement('td');
  let priceCell = document.createElement('td');
  let quantityCell = document.createElement('td');
  let totalCell = document.createElement('td');
  nameCell.textContent = item.product_name;
  

  priceCell.textContent = item.product_price;
  
  quantityCell.textContent = item.qty;
  
  // Calculate total based on price and quantity
  let totalValue = item.product_price * item.qty;
  totalCell.textContent = 'Rs ' + totalValue.toFixed(2);
  
  row.appendChild(nameCell);
  row.appendChild(priceCell);
  row.appendChild(quantityCell);
  row.appendChild(totalCell);
  cartTable.appendChild(row);
  
  // Add item total to cart total
  cartTotal += totalValue;
  
});
let cartTotalCell = document.getElementById('cartTotal');
cartTotalCell.textContent ='Rs '+ cartTotal.toFixed(2);

  })
  .catch(error => {
    console.error('Error:', error);
  });
}
// Populate cart table with items





// // Display cart total


// // get the clear cart button element
// const clearCartBtn = document.querySelector(".clear-cart");

// // add event listener to the button
// clearCartBtn.addEventListener("click", function() {
//   // get the cart table and cart total elements
//   const cartTable = document.querySelector("#cartTable");
//   const cartTotal = document.querySelector("#cartTotal");

//   // remove all rows from the cart table
//   while (cartTable.firstChild) {
//     cartTable.removeChild(cartTable.firstChild);
//   }

//   // update the cart total to zero
//   cartTotal.textContent = "0.00";
//   localStorage.clear();
// });

// get the clear cart button element
const clearCartBtn = document.querySelector(".clear-cart");

// add event listener to the button
clearCartBtn.addEventListener("click", function() {
  // Clear the local storage
  localStorage.removeItem('cart');

  // get the cart table and cart total elements
  const cartTable = document.querySelector("#cartTable");
  const cartTotal = document.querySelector("#cartTotal");

  // remove all rows from the cart table
  while (cartTable.firstChild) {
    cartTable.removeChild(cartTable.firstChild);
  }

  // update the cart total to zero
  cartTotal.textContent = 'Rs 0.00';
});



