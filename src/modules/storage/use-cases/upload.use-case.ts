import { Injectable } from '@nestjs/common';
import { MultipleUploadRequest, UploadRequest } from '../requests';
import { StorageService } from 'src/services/storage';
import { IStorageServiceProvider } from 'src/cores/contracts';

@Injectable()
export class UploadUseCase {
  constructor(
    private readonly storageService: StorageService,
    private readonly storageProvider: IStorageServiceProvider,
  ) {}

  async upload(uploadRequest: UploadRequest, file: S3.MultipartFile) {
    const uploaded = await this.storageService.upload({
      code: uploadRequest.code,
      file: file,
    });

    return {
      data: {
        id: uploaded.id,
        name: uploaded.originalName,
        extension: uploaded.ext,
        size: uploaded.size,
        url: await this.storageProvider.signedUrl(uploaded.path),
        createdAt: uploaded.createdAt,
        updatedAt: uploaded.updatedAt,
      },
    };
  }

  async uploadMultiple(uploadRequest: MultipleUploadRequest, files: S3.MultipartFile[]) {
    const uploaded = await Promise.all(
      files.map((file) =>
        this.storageService.upload({
          code: uploadRequest.code,
          file: file,
        }),
      ),
    );

    return await Promise.all(
      uploaded.map((upload) => ({
        id: upload.id,
        name: upload.originalName,
        extension: upload.ext,
        size: upload.size,
        url: this.storageProvider.signedUrl(upload.path),
        createdAt: upload.createdAt,
        updatedAt: upload.updatedAt,
      })),
    );
  }
}
