import { BadRequestException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class ValidationErrorException extends RpcException {
  constructor() {
    super(new BadRequestException('validation-error', 'Validation error'));
  }
}
