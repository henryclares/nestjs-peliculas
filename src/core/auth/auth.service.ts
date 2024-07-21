import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Usuario } from '../user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';
import { RegisterUserDto } from './dto/register.dto';
import { USUARIO_SISTEMA } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(usuario: string, password: string) {
    const user = await this.userService.findByUsername(usuario);
    if (!user) {
      throw new BadRequestException('auth/account-not-found');
    }
    const matches: boolean = await compare(password, user.password);

    if (!matches) {
      throw new BadRequestException('auth/wrong-password');
    }
    delete user.password;

    return await this.login(user);
  }

  async signUp(usuario: RegisterUserDto): Promise<Usuario> {
    const existing = await this.userService.findByUsername(usuario.user);

    if (existing) {
      throw new BadRequestException('auth/account-exists');
    }

    const user: Usuario = await this.userService.create(
      usuario,
      USUARIO_SISTEMA,
    );

    delete user.password;
    return user;
  }

  async login(user: Usuario) {
    const payload = {
      name: user.persona.nombres,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      persona: {
        nombres: user.persona.nombres,
        primerApellido: user.persona.primerApellido,
        segundoApellido: user.persona.segundoApellido,
      },
    };
  }

  async getProfile(id: string) {
    const user = await this.userService.findById(id);
    return {
      id: user.id,
      persona: {
        nombres: user.persona.nombres,
        primerApellido: user.persona.primerApellido,
        segundoApellido: user.persona.segundoApellido,
      },
    };
  }
}
