import { Router } from 'express';
import { WebsiteController } from '../controllers/website.controller';
import validate, { ValidationSource } from '../middleware/validate';
import { websiteSchema } from '../schema/website';

const router = Router();
const websiteController = new WebsiteController();

router.post('/', validate(websiteSchema, ValidationSource.BODY), (req, res) => websiteController.createWebsite(req, res));
router.put('/:id', validate(websiteSchema, ValidationSource.BODY), (req, res) => websiteController.updateWebsite(req, res));
router.delete('/:id', (req, res) => websiteController.deleteWebsite(req, res));
router.get('/:id', (req, res) => websiteController.getWebsiteById(req, res));
router.get('/', (req, res) => websiteController.getAllWebsites(req, res));

export default router;
