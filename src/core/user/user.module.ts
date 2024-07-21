import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsuarioRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entity/person.entity';
import { Usuario } from './entity/user.entity';
import { PersonaRepository } from './repository/person.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Persona])],
  controllers: [UserController],
  providers: [UserService, UsuarioRepository, PersonaRepository],
  exports: [UserService],
})
export class UserModule {}
