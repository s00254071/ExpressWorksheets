import { app } from './app';
import { env } from './config/env';
import { connectDB } from './config/database';

const startServer = async () => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
};

startServer();