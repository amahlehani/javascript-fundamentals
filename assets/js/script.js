alert("Welcome to my shop simulation!");

// product names and their prices
const products = ["apples", "mangoes", "oranges", "grapes", "banana"];
const prices = [10, 15, 12, 18, 15];

// function to display all products and their prices
function displayProducts() {
    console.log("Available products:");
    for (let i = 0; i < products.length; i++) {
        console.log(`${i + 1}. ${products[i]} - R${prices[i]}`);
    }
}

// function to get user input for product selection
function getProductSelection() {
    return [[0, 2], [1, 1], [4, 3]]; 
}

// function to calculate the total cost of selected products
function calculateTotalCost(selection) {
    let totalCost = 0;
    for (let i = 0; i < selection.length; i++) {
      const [productIndex, quantity] = selection[i];
      if (productIndex >= 0 && productIndex < prices.length) {
        totalCost += prices[productIndex] * quantity;
      } else {
        console.log(`Invalid product index: ${productIndex}`);
      }
    }
    return totalCost;
  }

// function to calculate the change after purchase
function calculateChange(totalCost, budget) {
    if (totalCost > budget) {
      console.log("Insufficient budget.");
      return null;
    }
    return budget - totalCost;
  }

// function to simulate the shop
function shopSimulation() {
    displayProducts();
    
    const userBudget = 200; // simulated user budget
    const productSelection = getProductSelection();
    
    const totalCost = calculateTotalCost(productSelection);
    if (totalCost === null) return;
  
    console.log(`Total cost: R${totalCost}`);
  
    const change = calculateChange(totalCost, userBudget);
    if (change !== null) {
      console.log(`Change: R${change}`);
    }
  }


// run the shop simulation
shopSimulation();


