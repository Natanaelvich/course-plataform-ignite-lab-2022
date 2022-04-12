import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private enrollmentsService: EnrollmentsService) {}

  @ResolveField(() => [Enrollment])
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.getEnrollmentsByStudentId(student.id);
  }
}
