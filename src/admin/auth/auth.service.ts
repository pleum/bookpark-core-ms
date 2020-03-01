import { Injectable } from '@nestjs/common';
import { ManagerService } from 'src/core/manager/manager.service';
import { JwtService } from '@nestjs/jwt';
import { Manager } from 'src/core/manager/interfaces/manager.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly managerService: ManagerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const manager: Manager = await this.managerService.findOne(username);
    if (manager && manager.password === pass) {
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
