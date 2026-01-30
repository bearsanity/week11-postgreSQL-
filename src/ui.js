const inquirer = require('inquirer');
const queries = require('./queries')

//================== Function to connect everything together + start the app ===================
async function mainMenu() {
  const answer = inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all products',
        'View low inventory',
        'View all suppliers',
        'Add a product',
        'Add a supplier',
        'Restock a product (increase quantity)',
        'Record a sale (decrease quantity)',
        'Update a product (price, supplier, category)',
        'Delete a product',
        'Exit'
      ]
    }
  ])
    switch (answer.choice) {
        case 'View all products':
            const products = await queries.viewAllProducts();
            console.table(products);
            await mainMenu();
            break;

        case 'View low inventory':
            const lowProducts = await queries.viewLowInventory();
            console.table(lowProducts);
            await mainMenu();
            break;

        case 'View all suppliers':
            const suppliers = await queries.viewAllSuppliers();
            console.table(suppliers);
            await mainMenu();
            break;

        case 'Exit':
            pool.end();  // close the connection
            break;
    }
  };


mainMenu();  // start the app