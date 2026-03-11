import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto, BulkCreateAttendanceDto } from './dto/create-attendance.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
    constructor(private prisma: PrismaService) { }

    create(createAttendanceDto: CreateAttendanceDto) {
        return this.prisma.attendance.create({
            data: {
                ...createAttendanceDto,
                date: new Date(createAttendanceDto.date),
            },
        });
    }

    createBulk(bulkDto: BulkCreateAttendanceDto) {
        const data = bulkDto.records.map(r => ({
            ...r,
            date: new Date(r.date),
        }));
        return this.prisma.attendance.createMany({
            data,
        });
    }

    findAllByBranch(branchId: string, startDate?: string, endDate?: string) {
        const where: any = { branchId };

        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date.gte = new Date(startDate);
            if (endDate) where.date.lte = new Date(endDate);
        }

        return this.prisma.attendance.findMany({
            where,
            include: {
                member: {
                    select: { firstName: true, lastName: true, phone: true }
                }
            },
            orderBy: { date: 'desc' }
        });
    }
}
