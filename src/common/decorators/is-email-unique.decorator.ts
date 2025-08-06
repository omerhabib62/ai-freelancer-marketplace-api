import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsEmailUniqueConstraint } from '../validators/is-email-unique-constraint.validator';

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}
