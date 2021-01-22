import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefundComponent } from './refund.component';
import { RefundAmountComponent } from './refund-amount/refund-amount.component';
import { TenantListForRefundComponent } from './tenant-list-for-refund/tenant-list-for-refund.component';
import { RefundAndAdjustmentComponent } from './refund-and-adjustment/refund-and-adjustment.component';
import { OfflinePaymentComponent } from './offline-payment/offline-payment.component';

const routes: Routes = [
  {
    path: '', component: RefundComponent,
    children: [
      { path: '', redirectTo: 'tenant-list-for-refund' },
      { path: 'tenant-list-for-refund', component: TenantListForRefundComponent },
      { path: 'Refund-and-adjustment', component: RefundAndAdjustmentComponent },
      { path: 'refund-amount', component: RefundAmountComponent },
      { path: 'offline-payment', component: OfflinePaymentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RefundRoutingModule { }
