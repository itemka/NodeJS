const fs = require('fs');
const path = require('path');

const createFolder = (name = 'notes') => {
  if (!path.join(__dirname, `${name}`)) {
    fs.mkdir(path.join(__dirname, `${name}`), err => {
      if (err) throw err;

      console.log(`${name} folder was creating!`)
    });
  } else {
    console.log('Folder is exist.')
  }
}

const readFile = (name = 'notes.txt') => {
  fs.readFile(
    path.join(__dirname, 'notes', `${name}`),
    'utf-8',
    (err, data) => {
      if (err) throw err;

      console.log(`Data from file ${name}: ${data}`)
    }
  )
}

const writeFile = (name = 'notes.txt') => {
  fs.writeFile(
    path.join(__dirname, 'notes', `${name}`),
    'Hello world',
    err => {
      if (err) throw err;

      console.log(`${name} file was creating!`)

      fs.appendFile(
        path.join(__dirname, 'notes', `${name}`),
        ' !!!',
        err => {
          if (err) throw err;

          console.log(`${name} file was supplemented!`)

          readFile();
        }
      );
    }
  )
}

const renameFile = (name = 'notes.txt') => {
  fs.rename(
    path.join(__dirname, 'notes', `${name}`),
    path.join(__dirname, 'notes', `new-${name}`),
    err => {
      if (err) throw err;

      console.log(`${name} file was renamed!`)
    }
  )
}

createFolder();
writeFile();