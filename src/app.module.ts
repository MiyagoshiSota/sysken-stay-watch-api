import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './service/prisma.service';
import { StayerService } from './service/stayer.service';
import { UserService } from './service/user.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,PrismaService,StayerService,UserService],
})
export class AppModule {}
