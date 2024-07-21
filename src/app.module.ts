import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './application/application.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApplicationModule,

    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
      exclude: [{ method: RequestMethod.ALL, path: 'check' }],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
