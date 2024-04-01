const pm2 = require('pm2');
const { promisify } = require('util');

class Pm2Lib {
  async getProcesses() {
    const processes = [];

    try {
      const [proc] = await promisify(pm2.describe).call(pm2, 'index.js');
      if (proc) {
        processes.push(proc);
      } else {
        processes.push({
          name: 'index.js',
          pm2_env: {
            status: 'stopped',
          },
        });
      }
    } catch (error) {
      console.error('Error getting processes:', error);
    }

    return processes;
  }

  async startProcess() {
    const proc = this.getStartOptions('index.js');

    try {
      return promisify(pm2.start).call(pm2, proc ,"--bot");
    } catch (error) {
      console.error('Error starting process:', error);
      throw error;
    }
  }

  async botstartProcess() {
    const proc = this.getStartOptions('index.js');

    try {
      return promisify(pm2.start).call(pm2, proc, { args: '--bot' });
    } catch (error) {
      console.error('Error starting process:', error);
      throw error;
    }
  }  

  async restartProcess() {
    try {
      return promisify(pm2.restart).call(pm2, 'index.js');
    } catch (error) {
      console.error('Error restarting process:', error);
      throw error;
    }
  }

  async stopProcess() {
    try {
      return promisify(pm2.stop).call(pm2, 'index.js');
    } catch (error) {
      console.error('Error stopping process:', error);
      throw error;
    }
  }

getStartOptions(filename) {
  return {
    script: `index.js`,
    name: filename,
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    output: `stdout.log`,
    error: `stderr.log`,
    exec_mode: 'fork',
  };
}

}

module.exports = new Pm2Lib();
