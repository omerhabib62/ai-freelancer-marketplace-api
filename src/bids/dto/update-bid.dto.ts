import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateBidDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  projectId?: string;
}
