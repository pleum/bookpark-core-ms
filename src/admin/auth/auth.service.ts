import { Injectable } from '@nestjs/common';
import { ManagerService } from 'src/core/manager/manager.service';
import { JwtService } from '@nestjs/jwt';
import { Manager } from 'src/core/manager/interfaces/manager.interface';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly managerService: ManagerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const manager: Manager = await this.managerService.findOne(username);
    const isCorrectPassword = await compare(password, manager.password);

    if (manager && isCorrectPassword) {
      const { password, ...result } = manager;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
