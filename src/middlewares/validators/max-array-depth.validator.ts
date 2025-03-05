import { Injectable, Logger } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'MaxArrayDepth', async: true })
@Injectable()
export class MaxArrayDepthValidator implements ValidatorConstraintInterface {
  private readonly logger: Logger = new Logger(MaxArrayDepthValidator.name);

  validate(value: any, args: ValidationArguments) {
    const maxDepth = args.constraints[0];
    return this.checkDepth(value) <= maxDepth;
  }

  private checkDepth(value: any, currentDepth = 0): number {
    if (!value || typeof value !== 'object') {
      return currentDepth;
    }

    if (Array.isArray(value)) {
      return Math.max(
        ...value.map((item) => this.checkDepth(item, currentDepth + 1)),
        currentDepth,
      );
    }

    return Math.max(...Object.values(value).map((val) => this.checkDepth(val, currentDepth)));
  }

  defaultMessage(args: ValidationArguments) {
    return `array depth cannot exceed ${args.constraints[0]} levels`;
  }
}

export const MaxArrayDepth = (maxDepth: number = 2, validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [maxDepth],
      validator: MaxArrayDepthValidator,
    });
  };
};
