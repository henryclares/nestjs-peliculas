import { BaseEntityClass } from 'src/common/BaseEntityClass';
import { Status } from 'src/common/constants';
import { Usuario } from 'src/core/user/entity/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favoritos' })
export class MovieFavorite extends BaseEntityClass {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    comment: 'Clave primaria de la tabla favoritos',
  })
  id: string;

  @Column({
    name: 'id_pelicula',
    length: 100,
    type: 'varchar',
    nullable: false,
    comment: 'Clave primaria de la tabla peliculas',
  })
  idPelicula: string;

  @Column({
    name: 'id_usuario',
    type: 'bigint',
    nullable: false,
    comment: 'Clave primaria de la tabla usuario',
  })
  idUsuario: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.favoriteMovies)
  @JoinColumn({
    name: 'id_usuario',
    referencedColumnName: 'id',
  })
  usuario: Usuario;

  constructor(data?: Partial<MovieFavorite>) {
    super(data);
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || Status.ACTIVO;
  }
}
