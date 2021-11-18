import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard extends AuthGuard('api-key') {
}
