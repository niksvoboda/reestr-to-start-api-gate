const fs = require('fs').promises;
const path = require('path');
const storagePath = '../storage'

class dbFile {
  async readFile(filename) {    
    let _filename = `${filename}.txt`
    _filename =  path.join(__dirname, storagePath , _filename);
    try {
      const data = await fs.readFile(_filename, 'utf8');
      return data;
    } catch (error) {
      console.error(`Error reading file: ${_filename}`, error);
      //throw error; // Генерировать ошибку, если чтение файла не удалось
    }
  }

  async writeFile(filename, data) {    
    let _filename = `${filename}.txt`
    _filename =  path.join(__dirname, storagePath , _filename); 
    try {
      await fs.writeFile(_filename, data);
      console.log(`Successfully wrote to file: ${_filename}`);
    } catch (error) {
      console.error(`Error writing to file: ${_filename}`, error);
     // throw error; // Генерировать ошибку, если запись в файл не удалась
    }
  }
}

module.exports = new dbFile();