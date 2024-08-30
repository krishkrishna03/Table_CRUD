const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const DATA_FILE_PATH = path.join(__dirname, 'data.json');

app.use(cors());
app.use(bodyParser.json());

const readDataFromFile = (filePath, callback) => {
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return callback(null, []);
      }
      return callback(err);
    }
    try {
      const jsonData = JSON.parse(fileData);
      callback(null, jsonData);
    } catch (parseErr) {
      callback(parseErr);
    }
  });
};

const writeDataToFile = (filePath, data, callback) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), callback);
};

app.post('/submit', (req, res) => {
  const newData = req.body;

  readDataFromFile(DATA_FILE_PATH, (readErr, jsonData) => {
    if (readErr) {
      return res.status(500).send('Failed to read data');
    }

    jsonData.push(newData);

    writeDataToFile(DATA_FILE_PATH, jsonData, (writeErr) => {
      if (writeErr) {
        return res.status(500).send('Failed to save data');
      }
      res.status(200).send('Data saved successfully');
    });
  });
});

app.get('/data', (req, res) => {
  readDataFromFile(DATA_FILE_PATH, (err, jsonData) => {
    if (err) {
      return res.status(500).send('Failed to read data');
    }
    res.status(200).json(jsonData);
  });
});

app.put('/edit/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  const updatedData = req.body;

  readDataFromFile(DATA_FILE_PATH, (readErr, jsonData) => {
    if (readErr) {
      return res.status(500).send('Failed to read data');
    }

    if (index >= 0 && index < jsonData.length) {
      jsonData[index] = updatedData;

      writeDataToFile(DATA_FILE_PATH, jsonData, (writeErr) => {
        if (writeErr) {
          return res.status(500).send('Failed to save data');
        }
        res.status(200).send('Data updated successfully');
      });
    } else {
      res.status(400).send('Invalid index');
    }
  });
});

app.delete('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);

  readDataFromFile(DATA_FILE_PATH, (readErr, jsonData) => {
    if (readErr) {
      return res.status(500).send('Failed to read data');
    }

    if (index >= 0 && index < jsonData.length) {
      jsonData.splice(index, 1);

      writeDataToFile(DATA_FILE_PATH, jsonData, (writeErr) => {
        if (writeErr) {
          return res.status(500).send('Failed to save data');
        }
        res.status(200).send('Data deleted successfully');
      });
    } else {
      res.status(400).send('Invalid index');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
