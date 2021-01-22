import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';

import { RefundComponent } from './refund.component';
import { RefundRoutingModule } from './refund-routing.module';
import { EmailFilterPipe } from './tenant-list-for-refund/email-filter.pipe';
import { TenantListForRefundComponent } from './tenant-list-for-refund/tenant-list-for-refund.component';
import { RefundAndAdjustmentComponent } from './refund-and-adjustment/refund-and-adjustment.component';
import { RefundAmountComponent } from './refund-amount/refund-amount.component';
import { OfflinePaymentComponent } from './offline-payment/offline-payment.component';
import { OnlyNumbresModule } from 'src/app/share/module/share/only-numbres.module';

@NgModule({
  declarations: [RefundComponent,
    EmailFilterPipe,
    TenantListForRefundComponent,
    RefundAndAdjustmentComponent,
    RefundAmountComponent,
    OfflinePaymentComponent,
    OfflinePaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    Ng2OrderModule,
    RefundRoutingModule,
    OnlyNumbresModule
  ]
})
export class RefundModule { }
