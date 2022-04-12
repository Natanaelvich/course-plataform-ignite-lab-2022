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

  getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({ where: { slug } });
  }

  async findOrCreate(title: string) {
    const slug = slugify(title);

    let cousrse = await this.getCourseBySlug(slug);

    if (!cousrse) {
      cousrse = await this.createCourse({
        title,
      });
    }

    return cousrse;
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
