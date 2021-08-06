import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV_CONSTANTS } from '../env.constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return {
          type: 'mssql',
          host: configService.get<string>(ENV_CONSTANTS.TYPEORM_HOST),
          username: configService.get<string>(ENV_CONSTANTS.TYPEORM_USERNAME),
          password: configService.get<string>(ENV_CONSTANTS.TYPEORM_PASSWORD),
          database: configService.get<string>(ENV_CONSTANTS.TYPEORM_DATABASE),
          port: Number(configService.get<string>(ENV_CONSTANTS.TYPEORM_PORT)),
          entities: [configService.get<string>(ENV_CONSTANTS.TYPEORM_ENTITIES)],
          synchronize: configService.get<boolean>(
            ENV_CONSTANTS.TYPEORM_SYNCHRONIZE,
          ),
          migrationsRun: configService.get<boolean>(
            ENV_CONSTANTS.TYPEORM_MIGRATIONS_RUN,
          ),
          migrations: [
            configService.get<string>(ENV_CONSTANTS.TYPEORM_MIGRATIONS),
          ],
          options: { enableArithAbort: true, encrypt: true },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DBModule {}
