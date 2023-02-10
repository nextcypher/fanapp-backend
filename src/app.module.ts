import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressSchema } from './schemas/address.schema';
import { AddressController } from './controller/address.controller';
import { AddressService } from './service/address.service';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGODB_URI}/addressDB`),
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
  ],
  controllers: [AppController, AddressController],
  providers: [AppService, AddressService],
})
export class AppModule {}
