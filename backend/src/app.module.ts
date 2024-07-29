import { Module } from '@nestjs/common';
import { BookModule } from './infrastructure/modules/book.module';
import { MemberModule } from './infrastructure/modules/member.module';

@Module({
  imports: [BookModule, MemberModule],
})
export class AppModule {}
