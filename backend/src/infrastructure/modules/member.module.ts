import { Module } from '@nestjs/common';
import { MemberController } from '../controllers/member.controller';
import { MemberService } from 'src/domain/services/member.service';
import { MemberRepository } from 'src/domain/repositories/member.repository';

@Module({
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule {}
