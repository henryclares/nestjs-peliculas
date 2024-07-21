import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Persona } from './person.entity';
import { Status } from 'src/common/constants';
import { BaseEntityClass } from 'src/common/BaseEntityClass';
import { MovieFavorite } from 'src/application/movies/entities/movie.entity';

@Entity({ name: 'usuarios' })
export class Usuario extends BaseEntityClass {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 500 })
  user: string;

  @Column({ length: 500 })
  password: string;

  @Column({
    name: 'id_persona',
    type: 'bigint',
    nullable: false,
    comment: 'clave foránea que referencia la tabla de Personas',
  })
  idPersona: string;

  @ManyToOne(() => Persona, (persona) => persona.usuarios, {
    nullable: false,
  })
  @JoinColumn({
    name: 'id_persona',
    referencedColumnName: 'id',
  })
  persona: Persona;

  @OneToMany(() => MovieFavorite, (movie) => movie.usuario, {
    nullable: false,
  })
  favoriteMovies: MovieFavorite[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || Status.ACTIVO;
  }
}
