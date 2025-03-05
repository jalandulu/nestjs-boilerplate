import { Prisma } from '@prisma/client';
import { PrismaDto } from 'src/cores/contracts/dtos';
import { ICreateFileDto, IUpdateFileDto } from 'src/cores/interfaces/dtos';

export class UpdateFileDto implements IUpdateFileDto, PrismaDto {
  fileType: string;
  originalName: string;
  name: string;
  path: string;
  ext: string;
  size: number;
  attributes?: { [key: string]: any };

  constructor(payload: ICreateFileDto) {
    Object.assign(this, payload);
  }

  get toPrisma(): Prisma.StgFileUncheckedUpdateInput {
    return {
      fileType: this.fileType,
      originalName: this.originalName,
      name: this.name,
      path: this.path,
      ext: this.ext,
      size: this.size,
      attributes: this.attributes,
    };
  }
}
