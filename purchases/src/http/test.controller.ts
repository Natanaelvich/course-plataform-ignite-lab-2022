import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Controller('test')
export class TestController {
  constructor(private prismaService: PrismaService) {}
  @Get()
  async hello() {
    return this.prismaService.customer.findMany();
  }
}
