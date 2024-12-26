import { Injectable } from '@nestjs/common';
import { PrismaClient, Website } from '@prisma/client';

@Injectable()
export class WebsiteService {
    private prisma = new PrismaClient();

    // Create a new website
    async create(data: Omit<Website, 'id' | 'createdAt' | 'updatedAt'>): Promise<Website> {
        return this.prisma.website.create({ data });
    }

    // Find all websites
    async findAll(): Promise<Website[]> {
        return this.prisma.website.findMany({ where: { deletedAt: null } });
    }

    // Find a single website by ID
    async findOne(id: number): Promise<Website | null> {
        return this.prisma.website.findUnique({ where: { id } });
    }

    // Update a website
    async update(id: number, data: Partial<Website>): Promise<Website> {
        return this.prisma.website.update({ where: { id }, data });
    }

    // Delete a website
    async remove(id: number): Promise<Website> {
        return this.prisma.website.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
}