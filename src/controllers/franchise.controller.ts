import { Request, Response } from 'express';
import { FranchiseService } from '../service/franchise.service';
import { HttpError } from '../utils/httpError';

export class FranchiseController {
    private franchiseService: FranchiseService;

    constructor() {
        this.franchiseService = new FranchiseService();
    }

    async createFranchise(req: Request, res: Response): Promise<void> {
        try {
            const franchise = await this.franchiseService.createFranchise(req.body);
            res.status(201).json(franchise);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    async updateFranchise(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const franchise = await this.franchiseService.updateFranchise(Number(id), req.body);
            res.status(200).json(franchise);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    async deleteFranchise(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.franchiseService.deleteFranchise(Number(id));
            res.status(204).send();
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    async getFranchiseById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const franchise = await this.franchiseService.getFranchiseById(Number(id));
            res.status(200).json(franchise);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    async getAllFranchises(req: Request, res: Response): Promise<void> {
        try {
            const franchises = await this.franchiseService.getAllFranchises();
            res.status(200).json(franchises);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }
}