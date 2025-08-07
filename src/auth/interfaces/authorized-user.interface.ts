import { User } from '../../common/entities/user.entity';

export interface AuthorizedUser {
  success: boolean;
  message: string;
  data: User | null;
}
