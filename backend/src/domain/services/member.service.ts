import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repositories/member.repository';
import { Member } from '../entities/member.entity';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  getAllMembers(): Member[] {
    return this.memberRepository.findAll();
  }
}
