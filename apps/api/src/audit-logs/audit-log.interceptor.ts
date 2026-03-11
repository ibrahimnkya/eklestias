import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
    constructor(private prisma: PrismaService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const { method, url, user, body } = req;

        return next.handle().pipe(
            tap(() => {
                if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
                    // Fire and forget audit log creation
                    this.prisma.auditLog.create({
                        data: {
                            userId: user?.userId || null,
                            action: method,
                            entity: url.split('?')[0].split('/')[1] || 'unknown',
                            details: JSON.stringify(body || {}),
                        }
                    }).catch(e => console.error('Audit log failed', e));
                }
            }),
        );
    }
}
