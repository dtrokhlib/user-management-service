import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');
            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException({
                message: 'User not authorized',
                error,
            });
        }
    }
}
