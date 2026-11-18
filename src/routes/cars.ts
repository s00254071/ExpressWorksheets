import { Router } from 'express';
import { CarController } from '../controllers/cars';
import { validate } from '../middleware/validation.middleware';
import { createCarZSchema, updateCarZSchema, carParamsSchema } from '../model/cars';
import { authenticateKey, authenticateJWT } from '../middleware/auth.middleware';

const router = Router();
const carController = new CarController();

router.get('/', carController.getCars);

router.get('/:id', validate(carParamsSchema), carController.getCarById);
router.post('/', authenticateKey, validate(createCarZSchema), carController.createCar);
router.put('/:id', validate(carParamsSchema.extend(updateCarZSchema.shape)), carController.updateCar);
router.delete('/:id', authenticateJWT, validate(carParamsSchema), carController.deleteCar);

export default router;