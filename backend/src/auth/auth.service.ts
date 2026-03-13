import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string, twoFactorCode?: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.twoFactorEnabled) {
      if (!twoFactorCode) {
        return { requiresTwoFactor: true };
      }
      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: twoFactorCode,
      });
      if (!verified) {
        throw new UnauthorizedException('Invalid 2FA code');
      }
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  async register(email: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      username,
      password: hashedPassword,
      role: 'user',
    });
    const { password: _, ...result } = user;
    return result;
  }

  async enable2FA(userId: number) {
    const secret = speakeasy.generateSecret({ name: 'MCLEGENDS.GG' });
    await this.usersService.update(userId, {
      twoFactorSecret: secret.base32,
      twoFactorEnabled: false,
    });
    return {
      secret: secret.base32,
      qrCode: secret.otpauth_url,
    };
  }

  async verify2FA(userId: number, token: string) {
    const user = await this.usersService.findOne(userId);
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
    });
    if (verified) {
      await this.usersService.update(userId, { twoFactorEnabled: true });
    }
    return verified;
  }
}
