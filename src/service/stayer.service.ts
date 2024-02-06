import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Stayer, User, Prisma } from '@prisma/client';

@Injectable()
export class StayerService {
  constructor(private prisma: PrismaService) {}

  //滞在者を取得
  async getNowStayersTime(): Promise<{  user_id: number; startTime: Date  }[]> {
    return this.prisma.stayer.findMany({
      where: {
        endTime: null,
      },
      select: {
        user_id: true,
        startTime: true,
      },
    });
  }

  //滞在履歴を取得
  async getOldStayersTime(): Promise<{ id:number;  user_id: number; startTime: Date; endTime: Date  }[]> {
    return this.prisma.stayer.findMany({
      where: {
        endTime: { not: null },
      },
      select: {
        id: true,
        user_id: true,
        startTime: true,
        endTime: true,
      },
    });
  }

  //滞在者と滞在履歴を取得
  async getStayhistory(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StayerWhereUniqueInput;
    where?: Prisma.StayerWhereInput;
    orderBy?: Prisma.StayerOrderByWithRelationInput;
  }): Promise<Stayer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.stayer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  //滞在者情報の追加
  async addStayer(data: Prisma.StayerCreateInput): Promise<Stayer> {
    return this.prisma.stayer.create({
      data,
    });
  }

  //滞在者情報の削除
  async deleteStayer(id: number): Promise<Stayer> {
    return this.prisma.stayer.delete({
      where: {
        id: id,
      },
    });
  }

  //endTimeの複数更新
  async updateEndTime(id: number): Promise<Stayer> {
    const stayers = await this.prisma.stayer.findMany({
      where: {
        user_id: id,
        endTime: null,
      },
    });

    if (stayers.length === 0) {
      return null;
    }

    const stayerId = stayers[0].id;

    return this.prisma.stayer.update({
      where: {
        id: stayerId,
      },
      data: {
        endTime: new Date(
          Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000,
        ),
      },
    });
  }

  //滞在者情報の更新
  async getStayersID(): Promise<{ user_id: number }[]> {
    return this.prisma.stayer.findMany({
      where: {
        endTime: null,
      },
      select: {
        user_id: true,
      },
    });
  }
}
