DROP DATABASE if exists databaseHRA;
CREATE database databaseHRA;
use databaseHRA;

create table tableTBL (
tbl_id int,
cust_name varchar(50) null,
cust_phone varchar(15) null,
cust_email varchar(40)
);