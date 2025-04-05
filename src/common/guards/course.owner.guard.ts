import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/modules/courses/entities/course.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CourseOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers['authorization'].split(' ')[1];
      const { user_id } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });
      const CourseTeacher = await this.courseRepository.findOne({
        where: { teacherId: user_id },
      });
      if (!CourseTeacher)
        throw new ForbiddenException('siz bu guruhga dars bermaysiz');
      return true;
    } catch (error) {
      throw new ForbiddenException('token invalid');
    }
  }
}
