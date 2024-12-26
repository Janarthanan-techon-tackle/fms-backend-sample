import { FranchiseRepository } from '../repository/franchise.repository';
import { HttpError, HttpStatus } from '../utils/httpError';
import { Franchise } from '@prisma/client';

export class FranchiseService {
    private franchiseRepository: FranchiseRepository;

    constructor() {
        this.franchiseRepository = new FranchiseRepository();
    }

    async createFranchise(data: Omit<Franchise, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Franchise> {
        try {
            return await this.franchiseRepository.createFranchise(data);
        } catch (error) {
            throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to create franchise');
        }
    }

    async updateFranchise(id: number, data: Partial<Franchise>): Promise<Franchise> {
        try {
            const franchise = await this.franchiseRepository.getFranchiseById(id);
            if (!franchise) {
                throw new HttpError(HttpStatus.NOT_FOUND, 'Franchise not found');
            }
            return await this.franchiseRepository.updateFranchise(id, data);
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to update franchise');
        }
    }

    async deleteFranchise(id: number): Promise<Franchise> {
        try {
            const franchise = await this.franchiseRepository.getFranchiseById(id);
            if (!franchise) {
                throw new HttpError(HttpStatus.NOT_FOUND, 'Franchise not found');
            }
            return await this.franchiseRepository.deleteFranchise(id);
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete franchise');
        }
    }

    async getFranchiseById(id: number): Promise<Franchise> {
        try {
            const franchise = await this.franchiseRepository.getFranchiseById(id);
            if (!franchise) {
                throw new HttpError(HttpStatus.NOT_FOUND, 'Franchise not found');
            }
            return franchise;
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch franchise');
        }
    }

    async getAllFranchises(): Promise<Franchise[]> {
        try {
            return await this.franchiseRepository.getAllFranchises();
        } catch (error) {
            throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch franchises');
        }
    }
}