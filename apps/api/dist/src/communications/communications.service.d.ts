import { SendSmsDto, SendWhatsappDto } from './dto/comms.dtos';
import { PrismaService } from '../prisma/prisma.service';
export declare class CommunicationsService {
    private prisma;
    constructor(prisma: PrismaService);
    sendSms(dto: SendSmsDto, organizationId: string): Promise<{
        id: string;
        type: string;
        createdAt: Date;
        organizationId: string;
        status: string;
        recipient: string;
        message: string;
    }>;
    sendWhatsapp(dto: SendWhatsappDto, organizationId: string): Promise<{
        id: string;
        type: string;
        createdAt: Date;
        organizationId: string;
        status: string;
        recipient: string;
        message: string;
    }>;
}
