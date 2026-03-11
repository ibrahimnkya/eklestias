export class CreateAttendanceDto {
    branchId: string;
    memberId: string;
    date: string;
    serviceType: string;
}

export class BulkCreateAttendanceDto {
    records: CreateAttendanceDto[];
}
