import express from 'express';

import routes from './routes';

const app = express();

app.use(routes);

app.listen(3333, () => {
  console.log('app listening up and to port 3333');
});
