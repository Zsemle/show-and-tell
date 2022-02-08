const path = require('path');

const carsRoutes = (app, fs) => {
  const dataPath = path.join(__dirname, '..', 'data', 'carBrands.json');

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

  app.get('/carbrands', (req, res) => {
    readFile((data) => {
      res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.send(data);
    }, true);
  });

  app.get('/carbrandslight', (req, res) => {
    readFile((data) => {
      const lightPayload = data.map((brand) => (
        {
          id: brand.id,
          displayName: brand.displayName,
        }
      ));
      res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.send(lightPayload);
    }, true);
  });

  app.get('/modelsofcarbrand/:id', (req, res) => {
    readFile((data) => {
      const carBrandId = req.params.id;
      res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      if (!data.find((carBrand) => carBrand.id === carBrandId)) {
        res.status(400).send(`id:${carBrandId} not found`);
        return;
      }
      res.send(data.find((carBrand) => carBrand.id === carBrandId).availableModels);
    }, true);
  });
};

module.exports = carsRoutes;
