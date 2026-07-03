import { Body, Controller, Get, Header, Headers, Param, Post, Query } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groups: GroupsService,
    private readonly auth: AuthService,
  ) {}
  private async userId(authorization?: string) {
    return this.auth.requireUser(await this.auth.authenticate(authorization)).id;
  }

  @Get()
  @Header('Cache-Control', 'no-store')
  async mine(@Headers('authorization') authorization?: string) {
    return this.groups.mine(await this.userId(authorization));
  }
  @Get('public') search(@Query('q') query = '') {
    return this.groups.searchPublic(query);
  }
  @Get('competitions') competitions() {
    return this.groups.availableCompetitions();
  }
  @Get(':id')
  @Header('Cache-Control', 'no-store')
  async get(@Param('id') id: string, @Headers('authorization') authorization?: string) {
    return this.groups.get(id, await this.userId(authorization));
  }
  @Post() async create(
    @Body() body: { name?: string; league?: string; tournament?: string; isPublic?: boolean },
    @Headers('authorization') authorization?: string,
  ) {
    return this.groups.create(await this.userId(authorization), body);
  }
  @Post('join') async join(
    @Body() body: { invitationCode?: string; groupId?: string },
    @Headers('authorization') authorization?: string,
  ) {
    return this.groups.join(await this.userId(authorization), body);
  }
}
