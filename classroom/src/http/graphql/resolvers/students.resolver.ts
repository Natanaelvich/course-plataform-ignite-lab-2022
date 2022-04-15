import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/student.service';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
  ) {}

  @ResolveField(() => [Enrollment])
  async enrollments(@Parent() studentExtended: Student) {
    const student = await this.studentsService.findOrCreateByAuthUserId({
      auth_user_id: studentExtended.auth_user_id,
    });

    return this.enrollmentsService.getEnrollmentsByStudentId(student.id);
  }
}
