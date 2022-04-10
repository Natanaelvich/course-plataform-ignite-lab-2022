import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/student.service';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}
  @Query(() => [Course])
  courses() {
    return this.coursesService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(
    @Args('course_id') course_id: string,
    @CurrentUser() user: AuthUser,
  ) {
    let student = await this.studentsService.getStudentsByAuthUserId(user.sub);

    if (!student) {
      student = await this.studentsService.createStudent({
        auth_user_id: user.sub,
      });
    }

    const courseFind = await this.coursesService.getCourseById(course_id);

    if (!courseFind) {
      throw new Error('Course not found');
    }

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      course_id: courseFind.id,
      student_id: student.id,
    });

    if (!enrollment) {
      throw new Error('You do not permition to access this course');
    }

    return courseFind;
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Course)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}
