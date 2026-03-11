import { MemberStatus } from '@prisma/client';

export class UpdateMemberStatusDto {
    status: MemberStatus;
}
