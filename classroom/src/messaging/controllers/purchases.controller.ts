import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/student.service';

export interface Custumer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreated {
  custumer: Custumer;
  product: Product;
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
  ) {}

  @EventPattern('purchase.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreated) {
    const student = await this.studentsService.findOrCreateByAuthUserId({
      auth_user_id: payload.custumer.authUserId,
    });

    const course = await this.coursesService.findOrCreate(
      payload.product.title,
    );

    await this.enrollmentsService.createEnrollment({
      student_id: student.id,
      course_id: course.id,
    });
  }
}
