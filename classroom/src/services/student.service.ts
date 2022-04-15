import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateStudentParams {
  auth_user_id: string;
}

interface FindByStudentId {
  student_id: string;
}

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}
  listAllStudents() {
    return this.prisma.student.findMany();
  }

  createStudent({ auth_user_id }: CreateStudentParams) {
    return this.prisma.student.create({
      data: {
        auth_user_id,
      },
    });
  }

  async findByStudentId({ student_id }: FindByStudentId) {
    return this.prisma.student.findUnique({ where: { id: student_id } });
  }

  async findOrCreateByAuthUserId({ auth_user_id }: CreateStudentParams) {
    let student = await this.prisma.student.findUnique({
      where: {
        auth_user_id,
      },
    });

    if (!student) {
      student = await this.createStudent({
        auth_user_id: auth_user_id,
      });
    }

    return student;
  }
}
