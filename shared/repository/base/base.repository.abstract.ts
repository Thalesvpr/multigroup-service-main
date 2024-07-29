import { PrismaClient } from "@prisma/client";
import { IBaseRepository } from "./base.repository.interface";
import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";


// export interface DbProvider extends OnModuleInit, OnModuleDestroy{

// }
export abstract class BaseRepository<T> {
    protected model: any;

    constructor(protected readonly dbProvider: any) {
        this.model = this.dbProvider[this.getModelName()];
    }

    protected abstract getModelName?(): string;

    async create(item: T): Promise<T> {
        return this.model.create({ data: item });
    }

    async update(id: number | string, item: Partial<T>): Promise<T> {
        return this.model.update({ where: { id: id }, data: item });
    }

    async delete(id: number | string): Promise<void> {
        await this.model.delete({ where: { id: id } });
    }

    async findOne(id: number | string): Promise<T | null> {
        return this.model.findUnique({ where: { id: id } });
    }

    async findAll(): Promise<T[]> {
        return this.model.findMany();
    }

    async findByCondition(condition: Partial<T>): Promise<T[]> {
        return this.model.findMany({ where: condition });
    }

    async remove(item: T): Promise<void> {
        await this.model.delete({ where: { id: (item as any).id } });
    }

    async saveMany(items: T[]): Promise<T[]> {
        const promises = items.map(item => this.create(item));
        return Promise.all(promises);
    }

    async createMany(items: T[]): Promise<T[]> {
        return this.model.createMany({ data: items });
    }

    async count(condition?: Partial<T>): Promise<number> {
        return this.model.count({ where: condition });
    }

    async exists(id: number | string): Promise<boolean> {
        const count = await this.model.count({ where: { id: id } });
        return count > 0;
    }

    async sum(field: string): Promise<number> {
        const result = await this.model.aggregate({
            _sum: { [field]: true }
        });
        return result._sum[field];
    }

    async average(field: string): Promise<number> {
        const result = await this.model.aggregate({
            _avg: { [field]: true }
        });
        return result._avg[field];
    }

    async min(field: string): Promise<T[keyof T] | null> {
        const result = await this.model.aggregate({
            _min: { [field]: true }
        });
        return result._min[field];
    }

    async max(field: string): Promise<T[keyof T] | null> {
        const result = await this.model.aggregate({
            _max: { [field]: true }
        });
        return result._max[field];
    }
}
