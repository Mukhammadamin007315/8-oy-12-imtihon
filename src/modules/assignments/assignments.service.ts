import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentsService {
  create(createAssignmentDto: CreateAssignmentDto, id: string) {
    return 'This action adds a new assignment';
  }
  findAll() {
    return `This action returns all assignments`;
  }
  findOne(id: number) {
    return `This action returns a #${id} assignment`;
  }
  remove(id: number) {
    return `This action removes a #${id} assignment`;
  }
}
