CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description VARCHAR (455) NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(5,2)
);