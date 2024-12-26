import { Router } from 'express';
import { FranchiseController } from '../controllers/franchise.controller';
import validate, { ValidationSource } from '../middleware/validate';
import { franchiseSchema } from '../schema/franchise';

const router = Router();
const franchiseController = new FranchiseController();

router.post('/', validate(franchiseSchema, ValidationSource.BODY), (req, res) => franchiseController.createFranchise(req, res));
router.put('/:id', validate(franchiseSchema, ValidationSource.BODY), (req, res) => franchiseController.updateFranchise(req, res));
router.delete('/:id', (req, res) => franchiseController.deleteFranchise(req, res));
router.get('/:id', (req, res) => franchiseController.getFranchiseById(req, res));
router.get('/', (req, res) => franchiseController.getAllFranchises(req, res));

export default router;