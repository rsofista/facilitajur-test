import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('list')
  list() {
    return this.clientsService.list();
  }

  @Post('create')
  create(@Body() dto) {
    return this.clientsService.create(dto);
  }

  @Get('min-route-from-company')
  minRouteFromCompany() {
    return this.clientsService.minRouteFromCompany();
  }
}
