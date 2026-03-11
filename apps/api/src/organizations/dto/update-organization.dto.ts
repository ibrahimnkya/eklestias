import { OrganizationType } from '@prisma/client';

export class UpdateOrganizationDto {
    name?: string;
    type?: OrganizationType;
}
