import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../../users/users.service';

@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(email: string, args: ValidationArguments) {
    const user = await this.usersService.findByEmail(email);
    return !user; // Return true if user doesn't exist (email is unique)
  }
  defaultMessage(args: ValidationArguments) {
    return `Email already exists`;
  }
}
