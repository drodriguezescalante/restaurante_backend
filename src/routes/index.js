const epxress = require('express');
const router = epxress.Router();
const fs = require('fs');

const pathRouter = `${__dirname}`;

const removeExtension = (fileName) => {
  return fileName.split('.').shift();
};

fs.readdirSync(pathRouter).filter((file) => {
  const fileWithOutExt = removeExtension(file);
  const skip = ['index'].includes(fileWithOutExt);
  if (!skip) {
    router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`));
    console.log('CARGAR RUTA ---->', fileWithOutExt);
  }
});

router.get('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(404);
  res.send({ error: 'Not found' });
});

module.exports = router;
