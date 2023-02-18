import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressController } from './controller/address.controller';
import { ValidateController } from './controller/validate.controller';
import { AddressService } from './service/address.service';
import { ValidateService } from './service/validate.service';
require('dotenv').config();

@Module({
  controllers: [AppController, AddressController, ValidateController],
  providers: [AppService, AddressService, ValidateService],
})
export class AppModule { }
