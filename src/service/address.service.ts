import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from 'src/dto/create-address.dto';
import { IAddress } from 'src/interface/address.interface';
import { UpdateAddressDto } from 'src/dto/update-address.dto';
require('dotenv').config();
var awsConfig = require('aws-config');
var AWS = require('aws-sdk');
var s3 = new AWS.S3({
  'AccessKeyID': process.env.AccessKeyID,
  'SecretAccessKey': process.env.SecretAccessKey,
  'Region': 'us-east-2'
});
@Injectable()
export class AddressService {
  private web3;
  constructor() {
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
  async createAddress(createAddressDto: CreateAddressDto): Promise<boolean> {
    var file = `${createAddressDto.wallet.toLowerCase()}.json`;
    console.log('input wallet', file);

    const body = {
      "wallet": createAddressDto.wallet,
      "signature": createAddressDto.signature,
      "shipAddress": createAddressDto.shipAddress,
      "name": createAddressDto.name,
      "phone": createAddressDto.phone
    };
    const isPassed = this.verifySignatureHash(
      createAddressDto.shipAddress,
      createAddressDto.signature,
      createAddressDto.wallet,
    );
    if (isPassed) {
      const params = {
        Bucket: 'nxc-profiles',
        Key: file,
        Body: JSON.stringify(body)
      };

      s3.putObject(params, function (err, data) {
        if (err) {
          console.log(err);
          return false;

        } else {
          console.log('File updated successfully.');
          return true;
        }
      });
    } else {
      return false;
    }
  }

  updateFile(content, file) {
    const params = {
      Bucket: 'nxc-profiles',
      Key: file,
      Body: content
    };
    s3.putObject(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('File updated successfully.');
      }
    });
  }

  async updateAddress(
    wallet: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<any> {
    const isPassed = this.verifySignatureHash(
      updateAddressDto.shipAddress,
      updateAddressDto.signature,
      updateAddressDto.wallet,
    );
    if (
      isPassed
    ) {
      const body = {
        "wallet": updateAddressDto.wallet,
        "signature": updateAddressDto.signature,
        "shipAddress": updateAddressDto.shipAddress,
        "name": updateAddressDto.name,
        "phone": updateAddressDto.phone
      };
      var file = `${wallet.toLowerCase()}.json`;
      const updatedContent = JSON.stringify(body);
      console.log('updated', updatedContent);
      try {
        await this.updateFile(updatedContent, file);
        return true;
      } catch (error) {
        console.log('error', error);
        return false;
      }

    }
  }
  async getAllAddresss(): Promise<IAddress[]> {
    try {
      const data = await s3.listObjectsV2({ Bucket: 'nxc-profiles', Prefix: 'nft/' }).promise();
      let dataArray = [];
      const files = await Promise.all(
        data.Contents.map(async (file) => {
          const fileData = await s3.getObject({ Bucket: 'nxc-profiles', Key: file.Key }).promise();
          dataArray.push(
            JSON.parse(fileData.Body.toString()),
          )
        })
      );
      return dataArray;
    } catch (error) {
      console.log('error', error)
      throw error;
    }
  }
  async getDatabyWallet(wallet: string): Promise<any> {
    var file = `${wallet.toLowerCase()}.json`;
    console.log('wallet', `${wallet.toLowerCase()}.json`)
    const params = {
      Bucket: 'nxc-profiles',
      Key: file
    };
    try {
      const data = await s3.getObject(params).promise();
      return JSON.parse(data.Body.toString());
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
