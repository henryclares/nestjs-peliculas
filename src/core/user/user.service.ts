import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { RegisterUserDto } from '../auth/dto/register.dto';
import { UsuarioRepository } from './repository/user.repository';
import { Usuario } from './entity/user.entity';
import { SALT_ROUND } from 'src/common/constants';
import { PersonaRepository } from './repository/person.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private personaRepository: PersonaRepository,
  ) {}

  async create(user: RegisterUserDto, usuarioCreacion: string): Promise<any> {
    const op = async (transaction: EntityManager) => {
      const persona = await this.personaRepository.create(
        {
          nombres: user.nombres,
          primerApellido: user.primerApellido,
          segundoApellido: user.segundoApellido,
          usuarioCreacion,
        },
        transaction,
      );

      const password = await this.hashPassword(user.password);

      const usuario = await this.usuarioRepository.create(
        {
          user: user.user,
          password,
          idPersona: persona.id,
          usuarioCreacion,
        },
        transaction,
      );

      return usuario;
    };

    return await this.usuarioRepository.runTransaction(op);
  }

  async findByUsername(username: string): Promise<Usuario> {
    const user = await this.usuarioRepository.findByUser(username);
    return user;
  }

  async hashPassword(plain: string): Promise<string> {
    const hashed: string = await hash(plain, SALT_ROUND);
    return hashed;
  }

  async findById(id: string) {
    return await this.usuarioRepository.findById(id);
  }
}
