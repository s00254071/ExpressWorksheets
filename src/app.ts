import express, { Application, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import carRoutes from './routes/cars';
import { env } from './config/env';
import { connectDB } from './config/database';
import {authenticateKey} from './middleware/auth.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { swaggerSpec } from './config/swagger';

const PORT = env.port;

const app: Application = express();

app.use(express.json());

app.use(requestLogger);

app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);

app.use('/api/v1/cars', authenticateKey, carRoutes);

app.get("/ping", async (_req: Request, res: Response) => {
    res.json({
        message: "hello from Mehmet"
    });
});

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
};

startServer();