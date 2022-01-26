const userRoutes = require('./users');

const appRouter = (app, fs) => {
  app.get('/', (req, res) => {
    res.send('You\'ve found the root of the server');
  });

  userRoutes(app, fs);
};

module.exports = appRouter;
