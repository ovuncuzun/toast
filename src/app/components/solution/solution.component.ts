import { Component, OnInit, Input } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent {

  @Input() orders: any;
  serverTotal = {}

  valueAscOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.value.localeCompare(b.value);
  }

  constructor() { }

  ngOnInit() {
    this.GetTotalByServer()
  }

  SumSubTotals() {
    return this.orders.map(i => i.subtotal + i.tax)
      .reduce((a, b) => a + b, 0)
  }

  GetTotalByServer() {
    this.orders.forEach(order => {
      if (this.serverTotal[order.server]) {
        this.serverTotal[order.server] += order.subtotal + order.tax
      } else {
        this.serverTotal[order.server] = order.subtotal + order.tax
      }
    })

    this.serverTotal["Grand Total"] = this.SumSubTotals();
    //this.serverTotal = this.SortObject(this.serverTotal)
    console.log(this.serverTotal)
  }


}