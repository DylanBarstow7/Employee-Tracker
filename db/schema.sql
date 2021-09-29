DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
-- below department_id is being used as foreign key
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);