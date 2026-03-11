import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { SendSmsDto, SendWhatsappDto } from './dto/comms.dtos';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('communications')
export class CommunicationsController {
    constructor(private readonly communicationsService: CommunicationsService) { }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR')
    @Post('sms')
    sendSms(@Body() dto: SendSmsDto, @Request() req: any) {
        return this.communicationsService.sendSms(dto, req.user.organizationId);
    }

    @Roles('SUPER_ADMIN', 'FOUNDER', 'BISHOP', 'PASTOR')
    @Post('whatsapp')
    sendWhatsapp(@Body() dto: SendWhatsappDto, @Request() req: any) {
        return this.communicationsService.sendWhatsapp(dto, req.user.organizationId);
    }
}
