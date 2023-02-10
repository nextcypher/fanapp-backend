import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateAddressDto } from 'src/dto/create-address.dto';
import { IAddress } from 'src/interface/address.interface';
import { Model } from 'mongoose';
import { UpdateAddressDto } from 'src/dto/update-address.dto';
@Injectable()
export class AddressService {
  private web3;
  constructor(@InjectModel('Address') private addressModel: Model<IAddress>) {
    const Web3 = require('web3');
    this.web3 = new Web3();
  }
  verifySignatureHash(
    shipAddress: string,
    signature: string,
    wallet: string,
  ): boolean {
    const recovered = this.web3.eth.accounts.recover(shipAddress, signature);
    return recovered === wallet;
  }
  async createAddress(createAddressDto: CreateAddressDto): Promise<IAddress> {
    const isPassed = this.verifySignatureHash(
      createAddressDto.shipAddress,
      createAddressDto.signature,
      createAddressDto.wallet,
    );
    if (isPassed) {
      const newAddress = await new this.addressModel(createAddressDto);
      return newAddress.save();
    }
  }
  async updateAddress(
    wallet: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<any> {
    if (
      this.verifySignatureHash(
        updateAddressDto.shipAddress,
        updateAddressDto.signature,
        updateAddressDto.wallet,
      )
    ) {
      const existingAddress = await this.addressModel.updateOne(
        { wallet },
        updateAddressDto,
      );
      if (!existingAddress) {
        throw new NotFoundException(`Address #${wallet} not found`);
      }
      return existingAddress;
    }
  }
  async getAllAddresss(): Promise<IAddress[]> {
    const addressData = await this.addressModel.find();
    if (!addressData || addressData.length == 0) {
      throw new NotFoundException('Addresss data not found!');
    }
    return addressData;
  }
  async getAddress(AddressId: string): Promise<IAddress> {
    const existingAddress = await this.addressModel.findById(AddressId).exec();
    if (!existingAddress) {
      throw new NotFoundException(`Address #${AddressId} not found`);
    }
    return existingAddress;
  }
  async getDatabyWallet(wallet: string): Promise<IAddress> {
    const existingAddress = await this.addressModel.findOne({ wallet }).exec();
    if (!existingAddress) {
      throw new NotFoundException(`Address #${wallet} not found`);
    }
    return existingAddress;
  }
  async deleteAddress(AddressId: string): Promise<IAddress> {
    const deletedAddress = await this.addressModel.findByIdAndDelete(AddressId);
    if (!deletedAddress) {
      throw new NotFoundException(`Address #${AddressId} not found`);
    }
    return deletedAddress;
  }
}
