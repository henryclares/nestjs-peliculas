import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { Persona } from '../entity/person.entity';

@Injectable()
export class PersonaRepository {
  constructor(private dataSource: DataSource) {}

  private getRepository(t?: EntityManager) {
    return t
      ? t.getRepository(Persona)
      : this.dataSource.getRepository(Persona);
  }

  async create(
    persona: Partial<Persona>,
    transaction?: EntityManager,
  ): Promise<Persona> {
    const newPersona = new Persona(persona);
    return await this.getRepository(transaction).save(newPersona);
  }

  async runTransaction<T>(op: (entityManager: EntityManager) => Promise<T>) {
    return this.dataSource.manager.transaction<T>(op);
  }
}
