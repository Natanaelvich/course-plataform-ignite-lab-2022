import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface GetByCourseAndStudentIdParams {
  student_id: string;
  course_id: string;
}
interface CreateEnrollmentParams {
  student_id: string;
  course_id: string;
}
@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  getByCourseAndStudentId({
    course_id,
    student_id,
  }: GetByCourseAndStudentIdParams) {
    console.log({
      course_id,
      student_id,
    });
    return this.prisma.enrollment.findFirst({
      where: {
        course_id,
        student_id,
      },
    });
  }

  getEnrollmentsByStudentId(student_id: string) {
    return this.prisma.enrollment.findMany({
      where: {
        student_id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async createEnrollment({ student_id, course_id }: CreateEnrollmentParams) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: course_id,
      },
    });

    if (!course) {
      throw new Error('course not found');
    }

    return await this.prisma.enrollment.create({
      data: {
        student_id,
        course_id,
      },
    });
  }
}
