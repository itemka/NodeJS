const os = require('os');

const osInf = () => {
  console.log(
    os.platform(),
    os.arch(),
    os.arch(),
    os.cpus(),
    os.freemem(),
    os.totalmem(),
    os.homedir(),
    os.uptime(),
  );
}

osInf();