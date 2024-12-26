import { PrismaClient, Franchise } from '@prisma/client';

export class FranchiseRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createFranchise(data: Omit<Franchise, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Franchise> {
        return this.prisma.franchise.create({ data });
    }

    async getFranchiseById(id: number): Promise<Franchise | null> {
        return this.prisma.franchise.findUnique({ where: { id } });
    }

    async getAllFranchises(): Promise<Franchise[]> {
        return this.prisma.franchise.findMany({where:{isActive:true}});
    }

    async updateFranchise(id: number, data: Partial<Franchise>): Promise<Franchise> {
        return this.prisma.franchise.update({ where: { id }, data });
    }

    async deleteFranchise(id: number): Promise<Franchise> {
        return this.prisma.franchise.delete({ where: { id } });
    }
}