import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { IsEmailUniqueConstraint } from './is-email-unique-constraint.validator';

@Injectable()
export class ValidationService implements OnModuleInit {
  constructor(
    private readonly isEmailUniqueConstraint: IsEmailUniqueConstraint,
  ) {
    console.log('ValidationService: Constructor called');
    console.log(
      'ValidationService: IsEmailUniqueConstraint injected:',
      !!this.isEmailUniqueConstraint,
    );
  }

  onModuleInit() {
    console.log('ValidationService: Registering isEmailUnique validator');
    registerDecorator({
      name: 'isEmailUnique',
      target: Object,
      propertyName: undefined,
      options: {},
      constraints: [],
      validator: this.isEmailUniqueConstraint,
    });
  }
}
