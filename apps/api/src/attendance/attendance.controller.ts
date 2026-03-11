import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto, BulkCreateAttendanceDto } from './dto/create-attendance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Roles('SUPER_ADMIN', 'PASTOR', 'DEPARTMENT_LEADER', 'USHER')
    @Post()
    create(@Body() createAttendanceDto: CreateAttendanceDto) {
        return this.attendanceService.create(createAttendanceDto);
    }

    @Roles('SUPER_ADMIN', 'PASTOR', 'DEPARTMENT_LEADER', 'USHER')
    @Post('bulk')
    createBulk(@Body() bulkDto: BulkCreateAttendanceDto) {
        return this.attendanceService.createBulk(bulkDto);
    }

    @Get('branch/:branchId')
    findAllByBranch(
        @Param('branchId') branchId: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string
    ) {
        return this.attendanceService.findAllByBranch(branchId, startDate, endDate);
    }
}
