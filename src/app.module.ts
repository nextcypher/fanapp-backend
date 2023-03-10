import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressController } from './controller/address.controller';
import { NftClaimController } from './controller/nftclaim.controller';
import { ValidateController } from './controller/validate.controller';
import { AddressService } from './service/address.service';
import { NftClaimService } from './service/nftclaim.service';
import { ValidateService } from './service/validate.service';
require('dotenv').config();

@Module({
  controllers: [AppController, AddressController, ValidateController, NftClaimController],
  providers: [AppService, AddressService, ValidateService, NftClaimService],
})
export class AppModule { }
