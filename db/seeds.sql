INSERT INTO suppliers (name, email, phone)
VALUES
  ('Acme Wholesale', 'contact@acme.com', '555-1234'),
  ('Hockey Warehouse', 'HWarehouse@hockey.com', '123-4567'),
  ('Anything store', 'anything@store.com', '234-5678'),
  ('Specific store', 'wedonthaveit@email.com', '567-2345');


INSERT INTO products (name, category, price, quantity, supplier_id)
VALUES
  ('Exploding beach ball', 'Electronics', 29.99, 50, 1),
  ('Really big robot', 'Electronics', 149.99, 3, 1), 
  ('Hockey stick', 'Sports', 299.99, 21, 2),
  ('Ice skates', 'Sports', 59.99, 1, 2),
  ('Water', 'Food', 2.99, 16, 3),
  ('Picture frame', 'Decor', 8.99, 13, 3),
  ('Freeze-dried saffron', 'Food', 299.99, 4, 4),
  ('Ancient egyptian goat hoof', 'Decor', 349.99, 6, 4);