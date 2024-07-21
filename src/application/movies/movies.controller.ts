import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { PaginacionQueryDto } from './dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(@Req() req, @Query() paginacionQueryDto: PaginacionQueryDto) {
    return await this.moviesService.obtener(paginacionQueryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/favoritos')
  findOne(@Req() req, @Query() paginacionQueryDto: PaginacionQueryDto) {
    return this.moviesService.listar(paginacionQueryDto, req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/agregar-favorito')
  async agregarFavorito(@Req() req, @Query('idPelicula') idPelicula: string) {
    return await this.moviesService.agregarFavorito(idPelicula, req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/quitar-favorito')
  async quitarFavorito(@Req() req, @Query('idPelicula') id: string) {
    return await this.moviesService.quitarFavorito(id, req.user.sub);
  }
}
