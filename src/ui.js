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
            
            const productChoices = products
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(s => ({
                name: s.name,
                value: s.id
            }));
            const quantityAnswers = await inquirer.prompt([
                { type: 'list', name: 'productId', message: 'Which product?', choices: productChoices },
                { type: 'input', name: 'quantity', message: 'How many would you like to add?'}
            ]);
           
            const result = await queries.restockProduct(quantityAnswers.productId, quantityAnswers.quantity);
            if (result) {
                console.log('Succesfully updated.')
            } else {
                console.log('Update failed. Try again')
            }
            await mainMenu();
            break;
        }

        case 'Record a sale (decrease quantity)': {
            const products = await queries.viewAllProducts();
            const productChoices = products.map(s => ({
                name: s.name,
                value: s.id
            }));
            const quantityAnswers = await inquirer.prompt([
                { type: 'list', name: 'productId', message: 'Which product?', choices: productChoices },
                { type: 'input', name: 'quantity', message: 'How many would you like to remove?'}
            ]);
           
            const result = await queries.recordSale(quantityAnswers.productId, quantityAnswers.quantity);
            if (result) {
                console.log('Succesfully updated.')
            } else {
                console.log('Update failed. Inventory too low.')
            }
            await mainMenu();
            break;
        }

        case 'Update a product (price, supplier, category)': {
            const products = await queries.viewAllProducts();
            const productChoices = products
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(p => ({
                    name: p.name,
                    value: p.id
                }));

            const { productId } = await inquirer.prompt([
                { type: 'list', name: 'productId', message: 'Which product?', choices: productChoices }
            ]);

            const currentProduct = products.find(p => p.id === productId);

            const suppliers = await queries.viewAllSuppliers();
            const supplierChoices = suppliers
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(s => ({
                    name: s.name,
                    value: s.id
                }));

            const updates = await inquirer.prompt([
                { type: 'input', name: 'price', message: 'New price?', default: currentProduct.price },
                { type: 'input', name: 'category', message: 'New category?', default: currentProduct.category },
                { type: 'list', name: 'supplier_id', message: 'New supplier?', choices: supplierChoices, default: currentProduct.supplier_id }
            ]);

            const updated = await queries.updateProduct(productId, updates.price, updates.category, updates.supplier_id);
            console.log('Updated:', updated);
            await mainMenu();
            break;
        }

        case 'Delete a product': {
            const products = await queries.viewAllProducts();
            const productChoices = products
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(p => ({
                    name: p.name,
                    value: p.id
                }));

            const { productId } = await inquirer.prompt([
                { type: 'list', name: 'productId', message: 'Which product do you want to delete?', choices: productChoices }
            ]);

            const { confirm } = await inquirer.prompt([
                { type: 'confirm', name: 'confirm', message: 'Are you sure?', default: false }
            ]);

            if (confirm) {
                const deleted = await queries.deleteProduct(productId);
                console.log('Deleted:', deleted);
            } else {
                console.log('Cancelled.');
            }
            await mainMenu();
            break;
        }

        case 'Exit': {
            console.log('Goodbye!');
            process.exit();
        }
    }
};

module.exports = { mainMenu };