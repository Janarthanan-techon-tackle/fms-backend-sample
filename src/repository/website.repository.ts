import { PrismaClient, Website } from '@prisma/client';

export class WebsiteRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createWebsite(data: Omit<Website, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Website> {
        return this.prisma.website.create({ data });
    }

    async getWebsiteById(id: number): Promise<Website | null> {
        return this.prisma.website.findUnique({ where: { id } });
    }

    async getAllWebsites(): Promise<Website[]> {
        return this.prisma.website.findMany({ where: { deletedAt: null } });
    }

    async updateWebsite(id: number, data: Partial<Website>): Promise<Website> {
        return this.prisma.website.update({ where: { id }, data });
    }

    async deleteWebsite(id: number): Promise<Website> {
        return this.prisma.website.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
}
