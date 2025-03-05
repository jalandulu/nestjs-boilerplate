import { Global, Module } from '@nestjs/common';
import { IsExistsValidator } from './is-exists.validator';
import { IsUniqueValidator } from './is-unique.validator';
import { IsMatchValidator } from './is-match.validator';
import { ValidDynamicAttributeValidator } from './valid-dynamic-attribute.validator';
import { MaxArrayDepthValidator } from './max-array-depth.validator';

@Global()
@Module({
  providers: [
    IsExistsValidator,
    IsUniqueValidator,
    IsMatchValidator,
    ValidDynamicAttributeValidator,
    MaxArrayDepthValidator,
  ],
  exports: [
    IsExistsValidator,
    IsUniqueValidator,
    IsMatchValidator,
    ValidDynamicAttributeValidator,
    MaxArrayDepthValidator,
  ],
})
export class ValidatorModule {}
