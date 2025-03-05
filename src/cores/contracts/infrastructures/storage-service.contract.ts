import { DeleteObjectCommandOutput, DeleteObjectsCommandOutput } from '@aws-sdk/client-s3';
import { S3ReadStream } from 's3-readstream/dist/S3Readstream';
import { IStorageSignedOption, IStorageUpload } from 'src/cores/interfaces';

export abstract class IStorageServiceProvider {
  abstract upload(
    path: string,
    file: { buffer: Buffer; mimetype: string },
  ): Promise<IStorageUpload>;

  abstract download(path: string): Promise<Buffer>;

  abstract publicUrl(path: string): string;

  abstract signedUrl(path: string, options?: IStorageSignedOption): Promise<string>;

  abstract readStream(path: string): Promise<S3ReadStream>;

  abstract delete(path: string): Promise<DeleteObjectCommandOutput>;

  abstract deleteMultiple(paths: string[]): Promise<DeleteObjectsCommandOutput>;

  abstract deleteSafely(path: string): Promise<DeleteObjectCommandOutput>;
}
