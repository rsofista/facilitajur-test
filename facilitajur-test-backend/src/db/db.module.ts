import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../consts';
import { DbService } from './db.service';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facilitajur-test',
    password: 'postgres',
    port: 5432,
  }),
};

@Module({
  providers: [dbProvider, DbService],
  exports: [dbProvider],
})
export class DbModule {}
