const { nanoid } = require('nanoid');
const path = require('path');

const userRoutes = (app, fs) => {
  const dataPath = path.join(__dirname, '..', 'data', 'users.json');

  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = 'utf8',
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = 'utf8',
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };

  app.get('/users', (req, res) => {
    readFile((data) => {
      res.send(data);
    }, true);
  });

  app.post('/users', (req, res) => {
    readFile((data) => {
      const newData = { ...data };
      const newUserId = nanoid();
      newData[newUserId] = req.body;

      writeFile(JSON.stringify(newData, null, 2), () => {
        res.status(200).send('new user added');
      });
    }, true);
  });

  app.put('/users/:id', (req, res) => {
    readFile((data) => {
      const userId = req.params.id;
      if (!data[userId]) {
        res.status(400).send(`users id:${userId} not found`);
        return;
      }

      const newData = { ...data };
      newData[userId] = req.body;

      writeFile(JSON.stringify(newData, null, 2), () => {
        res.status(200).send(`users id:${userId} updated`);
      });
    }, true);
  });

  app.delete('/users/:id', (req, res) => {
    readFile((data) => {
      const userId = req.params.id;
      if (!data[userId]) {
        res.status(400).send(`users id:${userId} not found`);
        return;
      }

      const newData = { ...data };
      delete newData[userId];

      writeFile(JSON.stringify(newData, null, 2), () => {
        res.status(200).send(`users id:${userId} removed`);
      });
    }, true);
  });
};

module.exports = userRoutes;
