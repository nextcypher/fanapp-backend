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
import { CreateValidateDto } from 'src/dto/create_validate.dto';
import { ValidateService } from 'src/service/validate.service';
@Controller('validate')
export class ValidateController {
  constructor(private readonly validateService: ValidateService) { }
  @Post()
  async getFormatedAddress(
    @Res() response,
    @Body() createValidateDto: CreateValidateDto,
  ) {
    try {
      const formatedAddress = await this.validateService.getFormatedAddress(createValidateDto)
      return response.status(HttpStatus.CREATED).json({
        message: 'Address has been created successfully',
        address: formatedAddress,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Address not created!',
        error: 'Bad Request',
      });
    }
  }
}
