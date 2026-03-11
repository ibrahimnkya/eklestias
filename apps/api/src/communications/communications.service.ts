import { Injectable } from '@nestjs/common';
import { SendSmsDto, SendWhatsappDto } from './dto/comms.dtos';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommunicationsService {
    constructor(private prisma: PrismaService) { }

    async sendSms(dto: SendSmsDto, organizationId: string) {
        // integration stub (e.g. NextSMS, BeemAfrica)
        const notification = await this.prisma.notification.create({
            data: {
                organizationId,
                type: 'SMS',
                recipient: dto.recipient,
                message: dto.message,
                status: 'SENT',
            },
        });
        return notification;
    }

    async sendWhatsapp(dto: SendWhatsappDto, organizationId: string) {
        // integration stub
        const notification = await this.prisma.notification.create({
            data: {
                organizationId,
                type: 'WHATSAPP',
                recipient: dto.recipient,
                message: dto.message,
                status: 'SENT',
            },
        });
        return notification;
    }
}
