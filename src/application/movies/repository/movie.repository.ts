import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { MovieFavorite } from '../entities/movie.entity';
import { PaginacionQueryDto } from '../dto/pagination.dto';
import { Status } from 'src/common/constants';

@Injectable()
export class MovieRepository {
  constructor(private dataSource: DataSource) {}

  private getRepository(t?: EntityManager) {
    return t
      ? t.getRepository(MovieFavorite)
      : this.dataSource.getRepository(MovieFavorite);
  }

  async create(
    idPelicula: string,
    idUsuario: string,
    transaction?: EntityManager,
  ): Promise<MovieFavorite> {
    const newMovie = new MovieFavorite({
      idPelicula,
      idUsuario,
      usuarioCreacion: idUsuario,
    });
    return this.getRepository(transaction).save(newMovie);
  }

  async listar(paginacionQueryDto: PaginacionQueryDto, idUsuario: string) {
    const { limite, saltar } = paginacionQueryDto;
    return await this.dataSource
      .getRepository(MovieFavorite)
      .createQueryBuilder('mf')
      .where('mf.estado = :estado', { estado: Status.ACTIVO })
      .where('mf.id_usuario = :usuarioId', { usuarioId: idUsuario })
      .skip(saltar)
      .take(limite)
      .orderBy('mf.fechaCreacion', 'DESC')
      .getManyAndCount();
  }

  async inactivar(id: string, idUsuario: string) {
    return await this.dataSource.getRepository(MovieFavorite).update(
      id,
      new MovieFavorite({
        estado: Status.INACTIVO,
        usuarioModificacion: idUsuario,
      }),
    );
  }

  async obtenerPorId(idPelicula: string, idUsuario: string) {
    return await this.dataSource
      .getRepository(MovieFavorite)
      .createQueryBuilder('mf')
      .where('mf.estado = :estado', { estado: Status.ACTIVO })
      .andWhere('mf.id_usuario = :usuarioId', { usuarioId: idUsuario })
      .andWhere('mf.idPelicula = :idPelicula', { idPelicula })
      .getOne();
  }
  async runTransaction<T>(op: (entityManager: EntityManager) => Promise<T>) {
    return this.dataSource.manager.transaction<T>(op);
  }
}
