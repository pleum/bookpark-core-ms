import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from 'src/core/register/register.service';
import { CreateRegisterDto } from 'src/core/register/dto/create-register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() body: CreateRegisterDto): Promise<any> {
    return this.registerService.register(body);
  }
}
