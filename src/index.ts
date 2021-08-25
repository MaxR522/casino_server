import config from './config';
import app from './loaders';
import Logger from './loaders/winston';

app.listen(config.port, () => {
  Logger.info(
    `Server :: application is running @ 'http://localhost:${config.port}' ! 🎉 `
  );
});
