import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateStudentParams {
  auth_user_id: string;
}

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}
  listAllStudents() {
    return this.prisma.student.findMany();
  }

  async getStudentsByAuthUserId(auth_user_id: string) {
    let student = await this.prisma.student.findUnique({
      where: { auth_user_id },
    });

    if (!student) {
      student = await this.prisma.student.create({
        data: {
          auth_user_id,
        },
      });
    }

    return student;
  }

  createStudent({ auth_user_id }: CreateStudentParams) {
    return this.prisma.student.create({
      data: {
        auth_user_id,
      },
    });
  }
}
