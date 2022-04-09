import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePurchaseInput {
  @Field()
  product_id: string;
}
