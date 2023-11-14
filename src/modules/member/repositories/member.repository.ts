import { BadRequestException, Injectable } from '@nestjs/common';
import { prisma } from 'src/database';

@Injectable()
export class MemberRepository {
  async getMemberWithWallet() {
    try {
      const members = await prisma.user.findMany({
        where: {
          wallet: {
            contains: '0x',
          },
          active: true,
        },
        select: {
          wallet: true,
          name: true,
          role: true,
        },
      });
      return members;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
