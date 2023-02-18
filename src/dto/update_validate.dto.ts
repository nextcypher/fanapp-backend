import { PartialType } from '@nestjs/mapped-types';
import { CreateValidateDto } from './create_validate.dto';
export class UpdateValidateDto extends PartialType(CreateValidateDto) {}