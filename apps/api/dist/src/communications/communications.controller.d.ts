import { CommunicationsService } from './communications.service';
import { SendSmsDto, SendWhatsappDto } from './dto/comms.dtos';
export declare class CommunicationsController {
    private readonly communicationsService;
    constructor(communicationsService: CommunicationsService);
    sendSms(dto: SendSmsDto, req: any): Promise<{
        id: string;
        type: string;
        createdAt: Date;
        organizationId: string;
        status: string;
        recipient: string;
        message: string;
    }>;
    sendWhatsapp(dto: SendWhatsappDto, req: any): Promise<{
        id: string;
        type: string;
        createdAt: Date;
        organizationId: string;
        status: string;
        recipient: string;
        message: string;
    }>;
}
