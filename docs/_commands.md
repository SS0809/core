# CLI Documentation

## Overview
The Core CLI is a Node.js script that provides a command-line interface for managing servers and fetching data from API endpoints. It interacts with various HTTP endpoints to perform actions such as toggling server states, retrieving data, and controlling processes.

## Installation
To use the Core CLI, follow these steps:

### Linux or Windows Subsystem for Linux (WSL)
1. Clone the repository:
    ```bash
    git clone https://github.com/moviemultiverse/core
    cd core
    ```
2. Configure your credentials by editing the `.env` file:
    ```bash
    nano .env
    ```
3. Install dependencies:
    ```bash
    npm install -g
    ```
4. Run the CLI using nodemon:
    ```bash
    npx nodemon index.js
    ```

### Command-Line Interface (CLI) Installation
1. Make the script files executable:
    ```bash
    chmod +x cli.mjs cli.js
    ```
2. Install the CLI globally:
    ```bash
    sudo npm install -g
    ```

## Functionalities
The Core CLI offers the following functionalities:

- **Toggle Server (ON)**: Starts the server.
- **Toggle Server (ON) with BOT enabled**: Starts the server with a BOT.
- **Toggle Server (OFF)**: Stops the server.
- **Toggle Server (RESTART)**: Restarts the server.
- **Size of the Movies Heap**: Fetches the total size of movies.
- **Get Movies**: Fetches and displays a list of available movies.
- **Get Telecore Data**: Fetches and displays data from the Telecore API.

## Usage
1. Ensure you have Node.js installed on your system.
2. Follow the installation steps mentioned above.
3. Run the script using Node.js:
    ```bash
    coree
    ```
4. Follow the prompts in the command-line interface to perform various actions:
    - Select an action from the available choices.
    - If applicable, provide additional input or select options as prompted.

## Notes
- Ensure that the required environment variables (`PORT`, `TELECORE_API_ENDPOINT`) are correctly configured in the `.env` file.
- Make sure to install and update the required npm packages (`inquirer`, `node-fetch`, `dotenv`) before running the CLI.

