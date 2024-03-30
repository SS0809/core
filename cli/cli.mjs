#!/usr/bin/env node

import select from '@inquirer/select';
import { Separator } from '@inquirer/select';
import fetch from 'node-fetch';
import inquirer from 'inquirer';  
import dotenv from 'dotenv';
dotenv.config();
import pm2lib from '../pm2lib.js';
const defaultport = process.env.PORT ;


const sizeAction = async () => { // Mark function as async
  //console.log('Evaluating size...');
  try {
    const response = await fetch(`http://localhost:${defaultport}/size`);
    if (response.ok) {
      const data = await response.json();
      console.log('\x1b[32mTotal Size:', data.totalSize, 'MB\x1b[32m');
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const getmovies = async () => {
  //console.log('\x1b[31mFetching Data...\x1b[0m');
  try {
    const response = await fetch(`http://localhost:${defaultport}/movie_data`);
    if (response.ok) {
      const data = await response.json();
      const uniqueMovieNames = new Set();
      data.forEach(item => {
        uniqueMovieNames.add(item.movie_name);
      });

      const choices = Array.from(uniqueMovieNames).map(name => ({
        name,
        value: name,
      }));

      const { selectedMovies } = await inquirer.prompt({
        type: 'checkbox',
        message: 'Select movies:',
        name: 'selectedMovies',
        choices,
      });

      console.log('Selected movies:', selectedMovies);
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};


const get_telecore_data = async () => {
  //console.log('\x1b[31mFetching Data...\x1b[0m');
  try {
    const response = await fetch(process.env.TELECORE_API_ENDPOINT);
    if (response.ok) {
      const data = await response.json();
      const uniqueMovieNames = new Set();
      data.forEach(item => {
        uniqueMovieNames.add(item.file_name);
      });

      const choices = Array.from(uniqueMovieNames).map(name => ({
        name,
        value: name,
      }));

      const { selectedMovies } = await inquirer.prompt({
        type: 'checkbox',
        message: 'Select movies:',
        name: 'selectedMovies',
        choices,
      });

      console.log('Selected movies:', selectedMovies);
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};


const main = async () => {
  while (true) {
    const processes = await pm2lib.getProcesses();
    (processes[0].pm2_env.status == 'online')?console.log('online\x1b[32m'):console.log('offline\x1b[32m');
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      loop: false,
      message: 'Heyy Dear, what can i do :',
      choices: [
        new inquirer.Separator('servers'),
        {
          name: 'Toggle Server (ON)',
          value: 'ServerON',
        },
        {
          name: 'Toggle Server (ON) with BOT enabled',
          value: 'ServerONBOT',
        },        
        {
          name: 'Toggle Server (OFF)',
          value: 'ServerOFF',
        },  
        {
          name: 'Toggle Server (RESTART)',
          value: 'ServerRE',
        },                
        {
          name: 'Exit',
          value: 'exit',
        },
        new inquirer.Separator('content'),
        {
          name: 'Size of the Movies heap',
          value: 'size',
        },
        {
          name: 'Get Movies',
          value: 'movies',
        },
        {
          name: 'Get Telecore Data',
          value: 'telecore_data',
        },        
      ],
    });

    switch (action) {
      case 'size':
        await sizeAction();
        break;
        case 'movies':
          await getmovies();
        break;
        case 'telecore_data':
          await get_telecore_data();
          break;        
        case 'ServerON':
          await pm2lib.startProcess();
          break;
        case 'ServerONBOT':
          await pm2lib.botstartProcess();
          break;            
        case 'ServerOFF':
          await pm2lib.stopProcess();
          break;  
        case 'ServerRE':
          await pm2lib.restartProcess();
          break;                        
      case 'exit':
        process.exit(0); 
        break;
      default:
        console.log('Invalid selection');
    }
  }
};
main();
