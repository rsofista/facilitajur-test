import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  posx: number;
  posy: number;
};

@Injectable()
export class ClientsService {
  constructor(private db: DbService) {}

  async list(): Promise<Client[]> {
    return (await this.db.conn.query('select * from clients')).rows;
  }

  async create(dto) {
    return this.db.conn.query(
      'insert into clients (name, email, phone, posX, posY) values ($1::text, $2::text, $3::text, $4::float, $5::float)',
      [
        dto.name || null,
        dto.email || null,
        dto.phone || null,
        dto.posX || null,
        dto.posY || null,
      ],
    );
  }

  async minRouteFromCompany() {
    const config = await this.db.configs();
    const clients = await this.list();

    const points = [
      {
        id: 0,
        name: 'Empresa',
        lat: config.companyposx,
        lng: config.companyposy,
      },
    ];

    const visitedMap = {};

    for (let i = 0; i < clients.length; i++) {
      let minDistance = {
        client: clients[i],
        distance: Number.MAX_SAFE_INTEGER,
      };

      for (let j = 0; j < clients.length; j++) {
        const client = clients[j];

        if (visitedMap[client.id]) continue;

        const distance = this.distance(
          client.posx,
          client.posy,
          points[points.length - 1].lat,
          points[points.length - 1].lng,
        );

        if (distance < minDistance.distance) {
          minDistance.distance = distance;
          minDistance.client = client;
        }
      }

      visitedMap[minDistance.client.id] = true;

      points.push({
        id: minDistance.client.id,
        name: minDistance.client.name,
        lat: minDistance.client.posx,
        lng: minDistance.client.posy,
      });
    }

    return points;
  }

  // -----------
  private distance(x1, x2, y1, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y2;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
}
