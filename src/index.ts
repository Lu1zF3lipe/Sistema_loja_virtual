import express from 'express';
import { statusRoute } from './routes/status.routes';
import { userRoutes } from './routes/user.routes';


const app = express();

//configuraçoes da aplicaçao 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(statusRoute);
app.use(userRoutes);

app.listen(3000, () => {
  console.log('aplicaçao rodando');
  console.log('http://localhost:3000/status');
});
