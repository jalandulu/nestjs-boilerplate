import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Storage } from 'src/common/helpers';
import { IStorageRepository } from 'src/cores/interfaces';
import { StorageCode } from 'src/cores/enums';

@Injectable()
export class StorageService {
  constructor(
    private readonly storageRepository: IStorageRepository,
    private readonly dataService: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  async upload({
    code,
    file,
  }: {
    code: StorageCode;
    file: S3.MultipartFile;
    editable?: boolean;
    removable?: boolean;
  }) {
    const path = Storage.path(code);

    const uploaded = await this.storageRepository.upload({
      path,
      file,
    });

    const saved = await this.dataService.tx.stgFile.create({
      data: {
        fileType: code,
        name: uploaded.name,
        originalName: uploaded.originalName,
        path: uploaded.path,
        ext: uploaded.ext,
        size: uploaded.size,
      },
    });

    return saved;
  }
}
