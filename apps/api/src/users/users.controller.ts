import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, UnauthorizedException, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import * as bcrypt from 'bcrypt';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly auditLogsService: AuditLogsService
    ) { }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'REGIONAL_LEADER')
    @Get()
    findAll(@Query('organizationId') organizationId: string) {
        return this.usersService.findAll(organizationId);
    }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'REGIONAL_LEADER')
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Roles('SUPER_ADMIN', 'FOUNDER')
    @Post()
    async create(@Body() createUserDto: any, @Request() req: any) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.usersService.create({
            ...createUserDto,
            password: hashedPassword,
        });
        await this.auditLogsService.create({
            userId: req.user.id,
            action: 'CREATE_USER',
            entity: 'User',
            entityId: user.id,
            details: `Created user ${user.email}`
        });
        return user;
    }

    @Roles('SUPER_ADMIN', 'FOUNDER')
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: any, @Request() req: any) {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        const user = await this.usersService.update(id, updateUserDto);
        await this.auditLogsService.create({
            userId: req.user.id,
            action: 'UPDATE_USER',
            entity: 'User',
            entityId: user.id,
            details: `Updated user ${user.email}`
        });
        return user;
    }

    @Roles('SUPER_ADMIN', 'FOUNDER')
    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req: any) {
        const user = await this.usersService.delete(id);
        await this.auditLogsService.create({
            userId: req.user.id,
            action: 'DELETE_USER',
            entity: 'User',
            entityId: id,
            details: `Deleted user ${user.email}`
        });
        return user;
    }
}
