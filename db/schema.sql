DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  depName VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  INDEX department_index (department_id),
  CONSTRAINT fk_department_id FOREIGN KEY (department_id)
  REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  INDEX role_index (role_id),
  CONSTRAINT fk_role_id FOREIGN KEY (role_id)
  REFERENCES roles(id),
  manager_id INT,
  INDEX manager_index (manager_id),
  CONSTRAINT fk_manager_id FOREIGN KEY (manager_id)
  REFERENCES employee(id)
);