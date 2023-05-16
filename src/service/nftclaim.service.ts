import { Injectable, NotFoundException } from '@nestjs/common';
import { NftClaimDto } from 'src/dto/nftclaim.dto';
import { IAddress } from 'src/interface/address.interface';
import { UpdateNftClaimDto } from 'src/dto/update-nftclaim.dto';
require('dotenv').config();
var awsConfig = require('aws-config');
var AWS = require('aws-sdk');
var s3 = new AWS.S3({
  'AccessKeyID': process.env.AccessKeyID,
  'SecretAccessKey': process.env.SecretAccessKey,
  'Region': 'us-east-2'
});
@Injectable()
export class NftClaimService {
  private web3;
  constructor() {
    const Web3 = require('web3');
    this.web3 = new Web3();
  }
  verifySignatureHash(
    shipAddress: string,
    signature: string,
    wallet: string,
    nftIndex: string,
    timestamp: string,
  ): boolean {
    const recovered = this.web3.eth.accounts.recover(shipAddress, signature);
    return recovered === wallet;
  }
  async createAddress(nftClaimDto: NftClaimDto): Promise<boolean> {
    var file = `nft/${nftClaimDto.nftIndex}.json`;
    console.log('input wallet', file);

    const body = {
      "wallet": nftClaimDto.wallet,
      "signature": nftClaimDto.signature,
      "shipAddress": nftClaimDto.shipAddress,
      "nftIndex": nftClaimDto.nftIndex,
      "timestamp": nftClaimDto.timestamp
    };
    const isPassed = this.verifySignatureHash(
      "NFT index: " + nftClaimDto.nftIndex.toString() + "\n" + "Shipping Address: " + nftClaimDto.shipAddress + "\n" + "Date: " + nftClaimDto.timestamp,
      nftClaimDto.signature,
      nftClaimDto.wallet,
      nftClaimDto.nftIndex,
      nftClaimDto.timestamp,
    );
    if (isPassed) {
      console.log("are you passed");
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

  async getDatabyNft(nft: number): Promise<any> {
    var file = `nft/${nft}.json`;
    console.log('nftIndex: ', `${nft}.json`)
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
