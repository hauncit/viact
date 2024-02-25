import { Controller } from '@nestjs/common';
import { AuthService } from './features/auth/auth.service';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
}
