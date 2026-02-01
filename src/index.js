require('dotenv').config();
const inquirer = require('inquirer');
const { mainMenu } = require('./ui');

mainMenu();


console.log(process.env.DB_HOST);  // "localhost"