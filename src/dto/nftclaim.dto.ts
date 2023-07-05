import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class NftClaimDto {
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly nftIndex: string;
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
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly phone: string;
}
