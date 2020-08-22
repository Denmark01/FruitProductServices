import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit {

  public data: any;
  constructor() { }

  ngOnInit() {
    this.data = [
      {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
       {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
        {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
         {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
          {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
           {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
            {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
             {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
              {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
               {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
                {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
                {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
                {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
                {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
                {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
                {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
                {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
                {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
                {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
                {name: 'denarmk', age: 20, city: 'bilaspur', email: 'd@tcs.com'},
                {name: 'lolly', age: 21, city: 'bilaspur', email: 'd@tcs.com'},
                {name: 'rake', age: 30, city: 'bilaspur', email: 'd@tcs.com'},
    ];
  }

}
