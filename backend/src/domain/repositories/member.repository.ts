import { Member } from '../entities/member.entity';

export class MemberRepository {
  private members: Member[] = [
    new Member('M001', 'Angga'),
    new Member('M002', 'Ferry'),
    new Member('M003', 'Putri'),
  ];

  findAll(): Member[] {
    return this.members;
  }

  findByCode(code: string): Member | undefined {
    return this.members.find((member) => member.code === code);
  }

  save(member: Member): void {
    const index = this.members.findIndex((m) => m.code === member.code);
    if (index > -1) {
      this.members[index] = member;
    } else {
      this.members.push(member);
    }
  }
}
