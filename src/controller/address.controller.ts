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
import { CreateAddressDto } from 'src/dto/create-address.dto';
import { UpdateAddressDto } from 'src/dto/update-address.dto';
import { AddressService } from 'src/service/address.service';
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Post()
  async createAddress(
    @Res() response,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    try {
      const newAddress = await this.addressService.createAddress(
        createAddressDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Address has been created successfully',
        newAddress,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Address not created!',
        error: 'Bad Request',
      });
    }
  }
  @Get(':wallet')
  async getDatabyWallet(@Res() response, @Param('wallet') wallet: string) {
    try {
      const targetAddress = await this.addressService.getDatabyWallet(wallet);
      return response.status(HttpStatus.CREATED).json({
        message: 'Address has been created successfully',
        targetAddress,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Address not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put(':wallet')
  async updateAddress(
    @Res() response,
    @Param('wallet') wallet: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    try {
      const existingAddress = await this.addressService.updateAddress(
        wallet,
        updateAddressDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Address has been successfully updated',
        existingAddress,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getAddresss(@Res() response) {
    try {
      const addressData = await this.addressService.getAllAddresss();
      return response.status(HttpStatus.OK).json({
        message: 'All Addresss data found successfully',
        addressData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getAddress(@Res() response, @Param('id') AddressId: string) {
    try {
      const existingAddress = await this.addressService.getAddress(AddressId);
      return response.status(HttpStatus.OK).json({
        message: 'Address found successfully',
        existingAddress,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteAddress(@Res() response, @Param('id') AddressId: string) {
    try {
      const deletedAddress = await this.addressService.deleteAddress(AddressId);
      return response.status(HttpStatus.OK).json({
        message: 'Address deleted successfully',
        deletedAddress,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
