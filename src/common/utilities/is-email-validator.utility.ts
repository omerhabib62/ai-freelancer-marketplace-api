import { registerDecorator } from 'class-validator';
import { IsEmailUniqueConstraint } from '../validators/is-email-unique-constraint.validator';

export function IsEmailUnique(validationOptions?: any) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}
