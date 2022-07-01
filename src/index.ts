import express from 'express';
import { statusRoute } from './routes/status.routes';

const app = express();

app.use(statusRoute);

app.listen(3000, () => {
  console.log('aplicaçao rodando');
  console.log('http://localhost:3000/status');
});
