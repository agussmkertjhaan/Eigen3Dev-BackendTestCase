import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { MemberRepository } from '../repositories/member.repository';
import { Member } from '../entities/member.entity';

describe('MemberService', () => {
  let service: MemberService;
  let repository: MemberRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberService, MemberRepository],
    }).compile();

    service = module.get<MemberService>(MemberService);
    repository = module.get<MemberRepository>(MemberRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all members', () => {
    const members = [
      new Member('M001', 'Angga'),
      new Member('M002', 'Ferry'),
      new Member('M003', 'Putri'),
    ];
    jest.spyOn(repository, 'findAll').mockReturnValue(members);

    expect(service.getAllMembers()).toEqual(members);
  });
});
