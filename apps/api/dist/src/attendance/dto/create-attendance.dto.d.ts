export declare class CreateAttendanceDto {
    branchId: string;
    memberId: string;
    date: string;
    serviceType: string;
}
export declare class BulkCreateAttendanceDto {
    records: CreateAttendanceDto[];
}
