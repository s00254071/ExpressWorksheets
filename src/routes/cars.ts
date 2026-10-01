import { Router } from 'express';
import { CarController } from '../controllers/cars';
import { validate } from '../middleware/validation.middleware';
import { createCarZSchema, updateCarZSchema } from '../model/cars';
import { authenticateKey } from '../middleware/auth.middleware';

const router = Router();
const carController = new CarController();

router.get('/', carController.getCars);

router.get('/:id', carController.getCarById);
router.post('/', authenticateKey, validate(createCarZSchema), carController.createCar);
router.put('/:id', validate(updateCarZSchema), carController.updateCar);
router.delete('/:id', carController.deleteCar);

export default router;