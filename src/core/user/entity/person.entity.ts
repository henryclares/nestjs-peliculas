import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './user.entity';
import { BaseEntityClass } from 'src/common/BaseEntityClass';
import { Status } from 'src/common/constants';

@Entity({ name: 'personas' })
export class Persona extends BaseEntityClass {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla Persona',
  })
  id: string;

  @Column({
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'Nombre de la persona',
  })
  nombres?: string | null;

  @Column({
    name: 'primer_apellido',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Primer apellido de la persona',
  })
  primerApellido?: string | null;

  @Column({
    name: 'segundo_apellido',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Segundo apellido de la persona',
  })
  segundoApellido?: string | null;

  @OneToMany(() => Usuario, (usuario) => usuario.persona)
  usuarios: Usuario[];

  constructor(data?: Partial<Persona>) {
    super(data);
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || Status.ACTIVO;
  }
}
