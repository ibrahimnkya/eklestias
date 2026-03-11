import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            roleLevel: any;
            organizationId: any;
            branchId: any;
        };
    }>;
    login(req: any): Promise<{
        accessToken: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            roleLevel: any;
            organizationId: any;
            branchId: any;
        };
    }>;
    getProfile(req: any): any;
}
