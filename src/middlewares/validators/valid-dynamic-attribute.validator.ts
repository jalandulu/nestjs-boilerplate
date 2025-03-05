import { Injectable, Logger } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'ValidDynamicAttribute', async: true })
@Injectable()
export class ValidDynamicAttributeValidator implements ValidatorConstraintInterface {
  private readonly logger: Logger = new Logger(ValidDynamicAttributeValidator.name);

  async validate(value: string) {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    return Object.values(value).every(
      (val) => typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean',
    );
  }

  defaultMessage() {
    return `$property are invalid.`;
  }
}

export const ValidDynamicAttribute = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidDynamicAttributeValidator,
    });
  };
};
