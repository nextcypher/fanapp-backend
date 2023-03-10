import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { NftClaimDto } from 'src/dto/nftclaim.dto';
import { UpdateNftClaimDto } from 'src/dto/update-nftclaim.dto';
import { NftClaimService } from 'src/service/nftclaim.service';

@Controller('nft')
export class NftClaimController {
  constructor(private readonly nftClaimService: NftClaimService) { }
  @Post()
  async createAddress(
    @Res() response,
    @Body() nftClaimDto: NftClaimDto,
  ) {
    try {
      const newAddress = await this.nftClaimService.createAddress(
        nftClaimDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Data has been created successfully',
        newAddress,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Data not created!',
        error: 'Bad Request',
      });
    }
  }
  @Get(':nft')
  async getDatabyNft(@Res() response, @Param('nft') nft: number) {
    try {
      const result = await this.nftClaimService.getDatabyNft(nft);
      console.log('target', result)
      return response.status(HttpStatus.CREATED).json({
        message: 'Data has been created successfully',
        data: result,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Data not created!',
        error: 'Bad Request',
      });
    }
  }
}
