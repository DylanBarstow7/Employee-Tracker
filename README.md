# Employee-Tracker

## Table of Contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Questions / Contacts](#Contacts)

## Description

Employee-Tracker is an application that allows you to access a database of employees, departments, and roles.

Audio Tutorial: https://watch.screencastify.com/v/P9H0JArgAnz6sWH73RKi

![alt text](https://github.com/DylanBarstow7/Employee-Tracker/blob/master/assets/employeeTrackerpic1.PNG)
![alt text](https://github.com/DylanBarstow7/Employee-Tracker/blob/master/assets/employeeTrackerpic2.PNG)

## Installation

Fork or clone the repository.  Open your terminal and access the root folder for this application.  Once there run 'npm i' to install all necessary packages.

Packages include: MySQL2, Inquirer, and console.table packages.

## Installation

Fork or clone the repository.  Open your terminal and access the root folder for this application.  

Run 'npm i'

After you've installed all packages you must source the schema and seed files.

Open MySql by typing 'mysql -u root -p' into your terminal.

Next type 'source db/schema.sql;'

Then type 'source db/seed.sql;'

Once the querys are complete you may quit mysql by typing

'quit'

## Usage

To active this application you must enter either of the following into your terminal after quitting mysql above.

'node index' or 'npm start'

## Contact

For enquiries contact me at dcbarstow7@gmail.com.

To see other projects, please visit https://github.com/DylanBarstow7/
