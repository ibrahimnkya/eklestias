import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getDashboardStats(organizationId: string): Promise<{
        totalMembers: number;
        activeMembers: number;
        monthGiving: number;
    }>;
}
