// product names and their prices
const products = ["apples", "mangoes", "oranges", "grapes", "bananas"];
const prices = [10, 15, 12, 18, 15];

// function to display all products with their prices
function displayProducts() {
  const productListDiv = document.getElementById('product-list');
  productListDiv.innerHTML = '<h2>Available Products</h2><br>';

  products.forEach((product, index) => {
      productListDiv.innerHTML += `<div class="product-item">${index + 1}. ${product} - R${prices[index]}</div>`;
  });
}

// function to parse user input and return the selection array
function parseUserSelection(input) {
  const selections = input.split(';').map(item => item.trim()).filter(item => item);
  return selections.map(selection => {
    const [index, quantity] = selection.split(',').map(Number);
    if (!isNaN(index) && !isNaN(quantity)) {
      return [index, quantity];
    } else {
      console.error(`Invalid selection format: ${selection}`);
      return null;
    }
  }).filter(item => item !== null); // Remove invalid selections
}

// function to calculate the total cost of selected products
function calculateTotalCost(selection) {
  return selection.reduce((totalCost, [productIndex, quantity]) => {
    if (productIndex >= 0 && productIndex < prices.length) {
      return totalCost + (prices[productIndex] * quantity);
    } else {
      console.error(`Invalid product index: ${productIndex}`);
      return totalCost;
    }
  }, 0);
}

// function to calculate the change after purchase
function calculateChange(totalCost, budget) {
  if (totalCost > budget) {
    return null; // Indicate insufficient funds
  }
  return budget - totalCost;
}

// function to display selected products in the cart
function displayCart(selection) {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '<h2>Your Cart</h2><br>';
  const cartList = document.createElement('ul');

  selection.forEach(([productIndex, quantity]) => {
    const cartItem = document.createElement('li');
    cartItem.className = 'cart-item';
    cartItem.textContent = `${products[productIndex]} - ${quantity} x R${prices[productIndex]}`;
    cartList.appendChild(cartItem);
  });

  cartDiv.appendChild(cartList);
}

// main function to simulate the shop with user input
function runShopSimulation(event) {
  event.preventDefault(); // Prevent the form from submitting

  displayProducts();

  const userBudget = parseFloat(document.getElementById('userBudget').value);
  const productSelectionsInput = document.getElementById('productSelections').value;

  if (isNaN(userBudget) || userBudget <= 0) {
    alert("Please enter a valid budget.");
    return;
  }

  const productSelection = parseUserSelection(productSelectionsInput);
  if (productSelection.length === 0) {
    alert("Please enter valid product selections.");
    return;
  }

  displayCart(productSelection);

  const totalCost = calculateTotalCost(productSelection);
  if (totalCost === null) return;

  const change = calculateChange(totalCost, userBudget);
  const resultDiv = document.getElementById('result');
  if (change === null) {
    resultDiv.innerHTML = `Total cost: R${totalCost}<br>Insufficient budget.<br>`;
  } else {
    resultDiv.innerHTML = `Total cost: R${totalCost}<br>Change: R${change}`;
  }
}

// Add event listener to handle form submission
document.getElementById('shop-form').addEventListener('submit', runShopSimulation);

// initial display of products
displayProducts();




