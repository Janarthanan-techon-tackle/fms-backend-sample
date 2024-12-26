import { Request, Response } from 'express';
import { WebsiteService } from '../service/website.service';
import { HttpError } from '../utils/httpError';

export class WebsiteController {
    private websiteService: WebsiteService;

    constructor() {
        this.websiteService = new WebsiteService();
    }

    async createWebsite(req: Request, res: Response): Promise<void> {
        try {
            const website = await this.websiteService.createWebsite(req.body);
            res.status(201).json(website);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    async updateWebsite(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const website = await this.websiteService.updateWebsite(Number(id), req.body);
            res.status(200).json(website);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    async deleteWebsite(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.websiteService.deleteWebsite(Number(id));
            res.status(204).send();
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    async getWebsiteById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const website = await this.websiteService.getWebsiteById(Number(id));
            res.status(200).json(website);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    async getAllWebsites(req: Request, res: Response): Promise<void> {
        try {
            const websites = await this.websiteService.getAllWebsites();
            res.status(200).json(websites);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }
}
