#!/usr/bin/env node
const axios       = require('axios');
const { prompt }  = require('inquirer');
const { navigate }= require('./util');
const program     = require('commander');
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Game Of Life', { horizontalLayout: 'full' })
  )
);

const questions = [
  {
    type : 'input',
    name : 'direction',
    message : 'Which direction would you like to go?',
    validate: function( value ) {
      const legitValues = ['north', 'east', 'south', 'west'];
      if (legitValues.includes(value.toLowerCase())) {
        return true;
      } else {
        return 'Please enter choose either north, east, south or west';
      }
    }
  }
];

program
  .version('0.0.1')
  .description('Room Exploration Game');

program
  .command('navigate')
  .alias('go')
  .description('Enter another room with a specified direction')
  .action(() => {
    prompt(questions)
    .then( async (direction) => {
      return await axios.get('http://localhost:8080')
        .then(res => navigate(direction, res.data))
        .catch(error => console.log(error));
    })
    .then( async (location) => {
      return await axios.get(`http://localhost:8080/${location.x}/${location.y}`)
        .then(res => console.log(res.data))
        .catch(error => console.log(error));
    })
    .then(() => {
      console.log(chalk.green('Try again, with "gol go"'));
    })
  });

program.parse(process.argv);