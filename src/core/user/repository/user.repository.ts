import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { Usuario } from '../entity/user.entity';

@Injectable()
export class UsuarioRepository {
  constructor(private dataSource: DataSource) {}

  private getRepository(t?: EntityManager) {
    return t
      ? t.getRepository(Usuario)
      : this.dataSource.getRepository(Usuario);
  }

  async create(
    user: Partial<Usuario>,
    transaction?: EntityManager,
  ): Promise<Usuario> {
    const newUser = new Usuario(user);
    return this.getRepository(transaction).save(newUser);
  }

  async findByUser(user: string): Promise<Usuario> {
    return this.getRepository().findOne({
      select: ['id', 'user', 'password', 'persona'],
      where: { user },
      relations: ['persona'],
    });
  }

  async findById(id: string) {
    return this.getRepository().findOne({
      select: ['id', 'user', 'persona'],
      where: { id },
      relations: ['persona'],
    });
  }

  async runTransaction<T>(op: (entityManager: EntityManager) => Promise<T>) {
    return this.dataSource.manager.transaction<T>(op);
  }
}
