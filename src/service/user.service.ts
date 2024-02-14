import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //ユーザの全情報を取得
  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  //ユーザ登録メソッド(id、名前、学年、学籍番号、MACaddressをDBに登録)
  async addUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  //ユーザ削除メソッド(idを指定しDBから削除)
  async deleteUser(id: number): Promise<User> {
    console.log(id);
    return this.prisma.user.delete({
      where: { id: id },
    });
  }

  //ユーザ情報を取得(名前と学年を取得)
  async getUserInfo(id: number): Promise<{ name: string; grade: string }> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        grade: true,
      },
    });
  }

  //滞在者情報を取得(名前と学年を取得)
  async getStayersInfo(
    user_id: number[],
  ): Promise<{ id:number; name: string; grade: string }[]> {
    return this.prisma.user.findMany({
      where: {
        id: {
          in: user_id,
        },
      },
      select: {
        id: true,
        name: true,
        grade: true,
      },
    });
  }

  //MACaddressを取得(滞在者更新メソッド用)
  async getMACaddress(stayersID: number[]): Promise<{ MACAddress: string }[]> {
    return this.prisma.user.findMany({
      where: {
        id: {
          in: stayersID,
        },
      },
      select: {
        MACAddress: true,
      },
    });
  }

  //MACaddressからユーザIDを取得(滞在者更新メソッド用)
  async getUserID(MACAddresses: string[]): Promise<{ id: number }[]> {
    return this.prisma.user.findMany({
      where: {
        MACAddress: {
          in: MACAddresses,
        },
      },
      select: {
        id: true,
      },
    });
  }
}
