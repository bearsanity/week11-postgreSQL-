const pool = require('./connections.js');

exports.getAllProducts = async function () {
    try {
        const res = await pool.query(
        `SELECT 
            products.id,
            products.name,
            products.category,
            products.price,
            products.quantity,
            suppliers.name AS supplier_name
            FROM products LEFT JOIN suppliers ON products.supplier_id = suppliers.id;`);
        return res.rows;
    } catch(err) {
        console.log(err);
    }
};

exports.viewLowInventory = async function () {
    try {
        const res = await pool.query(`SELECT * FROM products LEFT JOIN suppliers ON products.supplier_id = suppliers.id WHERE products.quantity < 5`);
        return res.rows;
    } catch(err) {
        console.log(err);
    }
};

exports.getAllSuppliers = async function () {
    try {
        const res = await pool.query(`SELECT * FROM suppliers`);
        return res.rows;
    } catch(err) {
        console.log(err);
    }
};