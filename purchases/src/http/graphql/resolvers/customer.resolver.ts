import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';
import { PurchasesService } from 'src/services/purchases.service';
import { Customer } from '../models/customer';
import { Purchase } from '../models/purchase';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomersByAuthUserId(user.sub);
  }

  @ResolveField(() => [Purchase])
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.getPurchasesByCustomerId(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { auth_user_id: string }) {
    return this.customersService.getCustomersByAuthUserId(
      reference.auth_user_id,
    );
  }
}
