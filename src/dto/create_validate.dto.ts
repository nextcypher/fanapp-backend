import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateValidateDto {
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly addressLines: string;
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly regionCode: string;
}
