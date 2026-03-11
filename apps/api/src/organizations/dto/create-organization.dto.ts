import { OrganizationType } from '@prisma/client';

export class CreateOrganizationDto {
    name: string;
    type: OrganizationType;
}
