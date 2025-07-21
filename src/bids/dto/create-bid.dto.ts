import { IsNumber, IsString } from 'class-validator';

export class CreateBidDto {
  @IsNumber()
  amount: number;

  @IsString()
  userId: string;

  @IsString()
  projectId: string;
}
