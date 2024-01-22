import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';

@Module({
  imports: [DbModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
