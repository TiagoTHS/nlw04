import 'reflect-metadata'
import express from 'express';
import "./database"
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

// 1 param => Porta Utilizada
app.listen(3333, () => console.log("Server is running!"));
