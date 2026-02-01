const inquirer = require('inquirer');
const queries = require('./queries')

//================== Function to connect everything together + start the app ===================
async function mainMenu() {
  const answer = await inquirer.prompt([
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
        case 'View all products': {
            const products = await queries.viewAllProducts();
            console.table(products);
            await mainMenu();
            break;
        }

        case 'View low inventory': {
            const lowProducts = await queries.viewLowInventory();
            console.table(lowProducts);
            await mainMenu();
            break;
        }

        case 'View all suppliers': { 
            const suppliers = await queries.viewAllSuppliers();
            console.table(suppliers);
            await mainMenu();
            break;
        }

        case 'Add a supplier': {
            const supplierAnswers = await inquirer.prompt([
                { type: 'input', name: 'name', message: "Supplier name?" },
                { type: 'input', name: 'email', message: "Supplier email?" },
                { type: 'input', name: 'phone', message: "Supplier phone?" }
            ]);
            await queries.addSupplier(supplierAnswers.name, supplierAnswers.email, supplierAnswers.phone);
            await mainMenu();
            break;
        }

        case 'Add a product': {
            const suppliers = await queries.viewAllSuppliers();
            const supplierChoices = suppliers.map(s => ({
                name: s.name,
                value: s.id 
        }));
            const productAnswers = await inquirer.prompt([
                { type: 'input', name: 'name', message: "Product name?" },
                { type: 'input', name: 'category', message: "Product category?" },
                { type: 'input', name: 'price', message: "Product price?" },
                { type: 'input', name: 'quantity', message: "Product starting quantity?" },
                { type: 'list', name: 'choice', message: 'What is the supplier?', choices: supplierChoices }
            ]);
            await queries.addProduct(productAnswers.name, productAnswers.category, productAnswers.price, productAnswers.quantity, productAnswers.choice);
            await mainMenu();
            break;
        }
        case 'Restock a product (increase quantity)': {
            const products = await queries.viewAllProducts();
            const productChoices = products.map(s => ({
                name: s.name,
                value: s.id
            }));
            const quantityAnswers = await inquirer.prompt([
                { type: 'list', name: 'productId', message: 'Which product?', choices: productChoices },
                { type: 'input', name: 'quantity', message: 'How many would you like to add?'}
            ]);
           
            await queries.restockProduct(quantityAnswers.productId, quantityAnswers.quantity);
            await mainMenu();
            break;
        }

        case 'Exit': {
            pool.end();  // close the connection
            break;
        }
    }
  };

module.exports = { mainMenu };