import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateAddressDto {
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly wallet: string;
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly signature: string;
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly shipAddress: string;
}
