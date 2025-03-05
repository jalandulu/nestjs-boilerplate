import { Injectable } from '@nestjs/common';
import { IStorageServiceProvider } from 'src/cores/contracts';
import { FileEntity, FileMap, FilesMap, IPaginationMetaEntity } from 'src/cores/entities';
import { FilePrivateMapper } from './file-private.mapper';
import { FilePublicMapper } from './file-public.mapper';

@Injectable()
export class FileMapper {
  private privateMapper: FilePrivateMapper;
  private publicMapper: FilePublicMapper;

  constructor(storageProvider: IStorageServiceProvider) {
    this.privateMapper = new FilePrivateMapper(storageProvider);
    this.publicMapper = new FilePublicMapper(storageProvider);
  }

  async toMap(file: FileMap, options?: { public: boolean }): Promise<FileEntity> {
    if (options?.public) {
      return this.publicMapper.toMap(file);
    }

    return await this.privateMapper.toMap(file);
  }

  async toCollection(files: FilesMap) {
    const mapped = await Promise.all(files.map((file) => this.toMap(file)));

    return mapped.map((file) => file);
  }

  async toPaginator(data: FileMap[], meta: IPaginationMetaEntity) {
    const mapped = await Promise.all(data.map((file) => this.toMap(file)));

    return {
      data: mapped.map((file) => file),
      meta: meta,
    };
  }
}
