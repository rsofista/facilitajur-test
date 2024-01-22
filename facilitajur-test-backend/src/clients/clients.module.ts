import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { DbService } from 'src/db/db.service';

@Module({
  imports: [DbModule],
  providers: [ClientsService, DbService],
  controllers: [ClientsController],
})
export class ClientsModule {}
