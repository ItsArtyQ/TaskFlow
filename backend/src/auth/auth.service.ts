import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

export interface User {
  data: {
    user: {
      id: string;
      email: string;
      username: string;
    };
    accessToken: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt());

    const user = await this.usersService.createUser({
      email,
      username,
      password: passwordHash,
    });

    if (!user) {
      throw new Error('User could not be created');
    }

    const payload = { sub: user.id, email: email, username: user.username };

    return {
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        accessToken: await this.jwtService.signAsync(payload),
      },
    };
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.usersService.user({ email: email });
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: email, username: user.username };
    return {
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        accessToken: await this.jwtService.signAsync(payload),
      },
    };
  }
}
