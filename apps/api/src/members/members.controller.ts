import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberStatusDto } from './dto/update-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) { }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR', 'DEPARTMENT_LEADER', 'USHER')
    @Post()
    create(@Body() createMemberDto: CreateMemberDto, @Request() req: any) {
        return this.membersService.create(createMemberDto, req.user.userId);
    }

    @Get()
    findAll(
        @Query('organizationId') organizationId: string,
        @Query('branchId') branchId?: string,
        @Query('status') status?: string
    ) {
        return this.membersService.findAll(organizationId, branchId, status);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.membersService.findOne(id);
    }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR')
    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body() updateMemberStatusDto: UpdateMemberStatusDto) {
        return this.membersService.updateStatus(id, updateMemberStatusDto);
    }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.membersService.remove(id);
    }
}
