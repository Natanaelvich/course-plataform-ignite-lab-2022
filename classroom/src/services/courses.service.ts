import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  getCourseById(course_id: string) {
    return this.prisma.course.findUnique({ where: { id: course_id } });
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title);
    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
    if (courseWithSameSlug) {
      throw new Error('Another course with same slug already exists');
    }
    return await this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
