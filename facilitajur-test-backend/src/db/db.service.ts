import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/consts';

@Injectable()
export class DbService {
  constructor(@Inject(PG_CONNECTION) public conn: Pool) {}

  async configs(): Promise<{
    id: number;
    companyposx: number;
    companyposy: number;
  }> {
    return (await this.conn.query('select * from configs where id = 1'))
      .rows[0];
  }
}
