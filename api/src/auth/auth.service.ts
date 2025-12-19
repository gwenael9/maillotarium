import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateAdmin(password: string) {
    if (password === process.env.ADMIN_PASSWORD) {
      return { role: 'admin' };
    }
    throw new UnauthorizedException('Mot de passe incorrect');
  }

  async login(password: string) {
    const { role } = await this.validateAdmin(password);
    return {
      access_token: this.jwtService.sign({ sub: 'admin_user', role }),
    };
  }
}
