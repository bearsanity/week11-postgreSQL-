const pool = require('./connections.js');

exports.viewAllProducts = async function () {
    try {
        const res = await pool.query(
        `SELECT 
            products.id,
            products.name,
            products.category,
            products.price,
            products.quantity,
            suppliers.name AS supplier_name
            FROM products LEFT JOIN suppliers ON products.supplier_id = suppliers.id
            WHERE active = true;`);
        return res.rows;
    } catch(err) {
        console.log(err);
    }
};

exports.viewLowInventory = async function () {
    try {
        const res = await pool.query(`SELECT * FROM products LEFT JOIN suppliers ON products.supplier_id = suppliers.id WHERE products.quantity < 5 AND active = true;`);
        return res.rows;
    } catch(err) {
        console.log(err);
    }
};

exports.viewAllSuppliers = async function () {
    try {
        const res = await pool.query(`SELECT * FROM suppliers`);
        return res.rows;
    } catch(err) {
        console.log(err);
    }
};

exports.addSupplier = async function (name, email, phone) {
    try {
        const res = await pool.query(
            `INSERT INTO suppliers (name, email, phone)
            VALUES ($1, $2, $3) RETURNING *`,
            [name, email, phone]);
        return res.rows[0];
    } catch(err) {
        console.log(err);
    }
};

exports.addProduct = async function (name, category, price, quantity, supplier_id) {
    try {
        const res = await pool.query(
            `INSERT INTO products (name, category, price, quantity, supplier_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, category, price, quantity, supplier_id]);
        return res.rows[0];
    } catch(err) {
        console.log(err);
    }
};

exports.restockProduct = async function (id, amount) {
    try {
        const res = await pool.query(
            `UPDATE products SET quantity = quantity + $1 WHERE id = $2 RETURNING *`, [amount, id]);
        return res.rows[0];
    } catch(err) {
        console.log(err);
    }
}

exports.recordSale = async function (id, amount) {
    try {
        const res = await pool.query(
            `UPDATE products SET quantity = quantity - $1 WHERE id = $2 AND quantity >= $1 RETURNING *`, [amount, id]);
        return res.rows[0];
    } catch(err) {
        console.log(err);
    }
}

exports.updateProduct = async function (id, price, category, supplier_id) {
    try {
        const res = await pool.query(
            `UPDATE products SET price = $1, category = $2, supplier_id = $3 WHERE id = $4 RETURNING *`,
            [price, category, supplier_id, id]);
        return res.rows[0];
    } catch(err) {
        console.log(err);
    }
}

exports.deleteProduct = async function (id) {
    try {
        const res = await pool.query(
            `UPDATE products SET active = false WHERE id = $1 RETURNING *`,
            [id]);
        return res.rows[0];
    } catch(err) {
        console.log(err);
    }
};