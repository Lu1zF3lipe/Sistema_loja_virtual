import 'express-async-errors';
import express from 'express';
import { errorHandler } from './middlewares/error-handler.middlewares';
import { statusRoute } from './routes/status.routes';
import { userRoutes } from './routes/user.routes';
import { prisma } from './db';

const app = express();

// configuraçoes da aplicaçao
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(statusRoute);
app.use(userRoutes);

app.use(errorHandler);

async function main() {
  await prisma.$connect();
  app.listen(3000, () => {
    console.log('aplicaçao rodando');
    console.log('http://localhost:3000/status');
  });
}

main();
