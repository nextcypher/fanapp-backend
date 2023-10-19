import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class UpdateNftClaimDto {
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly nftIndex: number;
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
  readonly timestamp: string;
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly shipAddress: string;
  @IsString()
  @MaxLength(200)
  readonly name: string;
  @IsString()
  @MaxLength(200)
  readonly phone: string;
}
