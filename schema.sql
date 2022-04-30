create database api_econexo_db;

drop table if exists customer;

create table if not exists customer (
	id serial primary key not null,
  	nome varchar(30) not null,
  	email varchar(30) not null unique,
  	senha text not null
)
