import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { CreateFileDto, UpdateFileDto } from 'src/cores/dtos';

@Injectable()
export class FileService {
  constructor(private readonly dataService: TransactionHost<TransactionalAdapterPrisma>) {}

  async findAll() {
    return await this.dataService.tx.stgFile.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: number) {
    return await this.dataService.tx.stgFile.findFirst({
      where: { id },
    });
  }

  async create(createFileDto: CreateFileDto) {
    return await this.dataService.tx.stgFile.create({
      data: createFileDto.toPrisma,
    });
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    return await this.dataService.tx.stgFile.update({
      where: {
        id,
      },
      data: updateFileDto.toPrisma,
    });
  }

  async remove(id: number) {
    return await this.dataService.tx.stgFile.update({
      where: { id },
      data: { deletedAt: DateTime.now().toISO() },
    });
  }

  async removeMany(ids: number[]) {
    return await this.dataService.tx.stgFile.updateMany({
      where: { id: { in: ids } },
      data: { deletedAt: DateTime.now().toISO() },
    });
  }

  async removeForce(id: number) {
    return await this.dataService.tx.stgFile.delete({
      where: { id },
    });
  }

  async removeForceMany(ids: number[]) {
    return await this.dataService.tx.stgFile.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
