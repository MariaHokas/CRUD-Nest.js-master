import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV_CONSTANTS } from 'src/env.constants';

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
          entities: [join(__dirname, '../entities/**/*.entity{.ts,.js}')],
          migrationsRun: false,
          synchronize: true,
          options: { enableArithAbort: true, encrypt: true },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DBModule {}
