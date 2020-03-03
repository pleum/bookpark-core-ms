import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReactAdminCrud } from 'src/admin/react-admin-crud.service';
import { Register } from './interfaces/register.interface';
import { CreateRegisterDto } from './dto/create-register.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class RegisterService extends ReactAdminCrud<Register> {
  constructor(
    @InjectModel('Register') private readonly registerModel: Model<Register>,
  ) {
    super(registerModel);
  }

  async register(createRegisterDto: CreateRegisterDto): Promise<any> {
    const hashedPassword = await hash(createRegisterDto.password, 10);

    return this.createOne({ ...createRegisterDto, password: hashedPassword });
  }
}
