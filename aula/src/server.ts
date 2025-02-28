import express from 'express';
import initRoutes from "./app.ts"
import connectDB from "./database/mongo.ts"
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors({
    origin: '*'
}))

connectDB();
initRoutes(app);

app.listen(port, () => console.log(`Acess: http://localhost:${port}`));
