import { Injectable } from '@nestjs/common';
import { IStorageServiceProvider } from 'src/cores/contracts';
import { FileEntity, FileMap, FilesMap, IPaginationMetaEntity } from 'src/cores/entities';

@Injectable()
export class FilePublicMapper {
  constructor(private readonly storageProvider: IStorageServiceProvider) {}

  toMap(file: FileMap): FileEntity {
    return {
      id: file.id,
      name: file.originalName,
      extension: file?.ext,
      size: file?.size,
      url: this.storageProvider.publicUrl(file.path),
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
    };
  }

  toCollection(files: FilesMap): FileEntity[] {
    return files.map((i) => this.toMap(i));
  }

  async toPaginator(data: FileMap[], meta: IPaginationMetaEntity) {
    return {
      data: this.toCollection(data),
      meta: meta,
    };
  }
}
