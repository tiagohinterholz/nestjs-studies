import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from 'src/messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from 'src/person/person.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tiago',
      database: 'postgres',
      password: 'tiagotiago',
      autoLoadEntities: true, //carrega entidades sem especificá-las
      synchronize: true, // Sincroniz com o DB. Não usar em PROD - USAR MIGRATIONS
    }),
    MessagesModule,
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
