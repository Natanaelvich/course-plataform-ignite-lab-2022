import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/student.service';
import { CreateEnrollmentInput } from '../inputs/create-enrollment-input';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}
  @Query(() => [Enrollment])
  Enrollments() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField(() => Course)
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.course_id);
  }

  @ResolveField(() => Student)
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudentsByAuthUserId(enrollment.student_id);
  }

  @Mutation(() => Enrollment)
  @UseGuards(AuthorizationGuard)
  async createEnrollment(
    @Args('data') data: CreateEnrollmentInput,
    @CurrentUser() user: AuthUser,
  ) {
    let student = await this.studentsService.getStudentsByAuthUserId(user.sub);

    if (!student) {
      student = await this.studentsService.createStudent({
        auth_user_id: user.sub,
      });
    }

    return this.enrollmentsService.createEnrollment({
      course_id: data.course_id,
      student_id: student.id,
    });
  }
}
