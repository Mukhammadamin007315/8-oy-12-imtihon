import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import AuthGuard from 'src/common/guards/auth.guard';
import { StudentGuard } from 'src/common/guards/student.guard';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Controller()
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}
  @Post('courses/:courseId/assignments')
  @UseGuards(AuthGuard, StudentGuard)
  create(
    @Body() createAssignmentDto: CreateAssignmentDto,
    @Param(':id') id: string,
  ) {
    return this.assignmentsService.create(createAssignmentDto, id);
  }
  @Get()
  findAll() {
    return this.assignmentsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(+id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(+id);
  }
}
