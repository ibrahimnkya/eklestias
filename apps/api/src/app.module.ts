import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { BranchesModule } from './branches/branches.module';
import { RolesModule } from './roles/roles.module';
import { MembersModule } from './members/members.module';
import { AttendanceModule } from './attendance/attendance.module';
import { FinanceModule } from './finance/finance.module';
import { ProjectsModule } from './projects/projects.module';
import { CommunicationsModule } from './communications/communications.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, OrganizationsModule, BranchesModule, RolesModule, MembersModule, AttendanceModule, FinanceModule, ProjectsModule, CommunicationsModule, AnalyticsModule, AuditLogsModule, DepartmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
