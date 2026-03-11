import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto, BulkCreateAttendanceDto } from './dto/create-attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(createAttendanceDto: CreateAttendanceDto): import("@prisma/client").Prisma.Prisma__AttendanceClient<{
        id: string;
        createdAt: Date;
        branchId: string;
        date: Date;
        serviceType: string;
        memberId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createBulk(bulkDto: BulkCreateAttendanceDto): import("@prisma/client").Prisma.PrismaPromise<import("@prisma/client").Prisma.BatchPayload>;
    findAllByBranch(branchId: string, startDate?: string, endDate?: string): import("@prisma/client").Prisma.PrismaPromise<({
        member: {
            firstName: string;
            lastName: string;
            phone: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        branchId: string;
        date: Date;
        serviceType: string;
        memberId: string;
    })[]>;
}
