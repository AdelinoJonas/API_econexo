create database api_econexo_db;

drop table if exists customer;

create table if not exists customer (
	id serial primary key not null,
  	nome varchar(30) not null,
  	email varchar(30) not null unique,
  	senha text not null
)

DROP TABLE IF EXISTS product

CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_image LONGBLOB  NOT NULL,
    product_description VARCHAR (455) NOT NULL,
    product_category VARCHAR (255) NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(5,2)
);
