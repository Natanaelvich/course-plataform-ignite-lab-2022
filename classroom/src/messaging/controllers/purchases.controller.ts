import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

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
  @EventPattern('purchase.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreated) {
    console.log('test', payload);
  }
}
