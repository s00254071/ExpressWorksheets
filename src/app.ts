import express, { Application, Request, Response } from "express";
import carRoutes from './routes/cars';
import { env } from './config/env';

const PORT = env.PORT;

const app: Application = express();

app.use('/api/v1/cars', carRoutes);

app.use(express.json());

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use('/api/v1/cars', carRoutes);

app.get("/ping", async (_req: Request, res: Response) => {
    res.json({
        message: "hello from Mehmet"
    });
});

app.get('/bananas', async (_req: Request, res: Response) => {
    res.json({
        message: "this is bananas",
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});