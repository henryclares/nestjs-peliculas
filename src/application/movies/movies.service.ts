import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { PaginacionQueryDto } from './dto/pagination.dto';
import { HttpService } from '@nestjs/axios';
import { MovieRepository } from './repository/movie.repository';

@Injectable()
export class MoviesService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private movieRepository: MovieRepository,
  ) {}

  async obtener(paginacion: PaginacionQueryDto) {
    this.httpService.axiosRef.interceptors.request.use((config) => {
      console.log(config);
      return null;
    });
    try {
      const response = this.httpService
        .get('', {
          params: {
            ...(paginacion.t && { t: paginacion.t }),
            ...(paginacion.y && { y: paginacion.y }),
            ...(paginacion.i && { i: paginacion.i }),
            ...(paginacion.limite && { limit: paginacion.limite }),
            ...(paginacion.pagina && { page: paginacion.pagina }),
            apikey: this.configService.get('OMDB_API_KEY'),
          },
        })
        .pipe(map((res) => res.data));

      return await firstValueFrom(response);
    } catch (error) {
      console.log('DEBUGPRINT[14]: movies.service.ts:37: error=', error);
      throw new BadRequestException('SERVICE', error);
    }
  }

  async agregarFavorito(idPelicula: string, idUsuario: string) {
    const existe = await this.obtenerPorId(idPelicula, idUsuario);
    if (existe) return true;

    return await this.movieRepository.create(idPelicula, idUsuario);
  }

  async quitarFavorito(id: string, idUsuario: string) {
    return await this.movieRepository.inactivar(id, idUsuario);
  }

  async listar(paginacionQueryDto: PaginacionQueryDto, idUsuario: string) {
    const favorites = await this.movieRepository.listar(
      paginacionQueryDto,
      idUsuario,
    );

    const movies = [];
    for await (const favorite of favorites[0]) {
      const movie = await this.obtener({
        i: favorite.idPelicula,
      } as PaginacionQueryDto);
      if (movie) {
        console.log('DEBUGPRINT[15]: movies.service.ts:65: movie=', movie);
        movies.push({ id: favorite.id, ...movie });
      }
    }

    return [movies, favorites[1]];
  }

  async obtenerPorId(idPelicula: string, idUsuario: string) {
    return await this.movieRepository.obtenerPorId(idPelicula, idUsuario);
  }
}
