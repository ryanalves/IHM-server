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
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'vaobora',
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
