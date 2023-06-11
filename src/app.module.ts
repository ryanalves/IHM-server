import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Carona } from './entities/carona.entity';
import { Endereco } from './entities/endereco.entity';
import { AuthModule } from './auth/auth.module';
import { CaronaModule } from './modules/carona.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_COLLECTION,
            entities: [Usuario, Carona, Endereco],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Usuario, Carona, Endereco]),
        AuthModule,
        CaronaModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
