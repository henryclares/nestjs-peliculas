import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';

@Module({
  controllers: [],
  providers: [],
  imports: [MoviesModule],
})
export class ApplicationModule {}
