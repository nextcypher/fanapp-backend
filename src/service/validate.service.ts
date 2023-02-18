import { Injectable, NotFoundException } from '@nestjs/common';
import axios from "axios";
require('dotenv').config();
import { CreateValidateDto } from 'src/dto/create_validate.dto';
@Injectable()
export class ValidateService {
    constructor() {
    }
    async getFormatedAddress(createValidateDto: CreateValidateDto): Promise<any> {
        const fetchURL = `${process.env.VALIDATE_URI}${process.env.GOOGLE_API_KEY}`;
        let formattedAddress = {};
        const response = await axios
            .post(fetchURL, {
                "address": {
                    addressLines: [createValidateDto.addressLines],
                    regionCode: createValidateDto.regionCode,
                }
            });

        formattedAddress = response.data.result.address;
        console.log(formattedAddress);

        return formattedAddress;
    }
}
