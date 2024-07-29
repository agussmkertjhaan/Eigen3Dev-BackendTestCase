import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MemberService } from 'src/domain/services/member.service';

@ApiTags('members')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  getAllMembers() {
    return this.memberService.getAllMembers();
  }
}
