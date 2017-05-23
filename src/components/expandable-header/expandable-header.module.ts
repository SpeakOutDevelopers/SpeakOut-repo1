import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { ExpandableHeader } from './expandable-header';

@NgModule({
  declarations: [
    ExpandableHeader,
  ],
  imports: [
    IonicPageModule.forChild(ExpandableHeader),
  ],
  exports: [
    ExpandableHeader
  ]
})
export class ExpandableHeaderModule {}
