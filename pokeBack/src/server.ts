import app from "./app"
import cors from 'cors';

const port = 8080;

app.use(cors({
    origin: '*'
}))

app.listen(port, () => console.log(`Access: http://localhost:${port}`));
