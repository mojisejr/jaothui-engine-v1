import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { prisma } from 'src/database';

@Injectable()
export class MemberRepository {
  async getMemberById(memberId: string) {
    try {
      const member = await prisma.user.findFirst({
        where: {
          wallet: memberId,
        },
      });
      if (!member) throw new NotFoundException('Member Not Found');
      return member;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateMemberIdToWallet(memberId: string, wallet: string) {
    try {
      const updated = await prisma.user.update({
        where: { wallet: memberId },
        data: { wallet: wallet },
      });
      return updated;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

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
