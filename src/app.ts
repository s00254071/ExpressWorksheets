import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import carRoutes from './routes/cars';
import {authenticateKey} from './middleware/auth.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { swaggerSpec } from './config/swagger';

export const app: Application = express();

app.use(cors());

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