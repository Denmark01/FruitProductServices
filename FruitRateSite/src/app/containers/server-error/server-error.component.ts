import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  public errorText: string;
  constructor( private router: ActivatedRoute) { }

  ngOnInit() {

    this.router.paramMap.subscribe(params => {
      this.errorText = params.get('code');
    })
  }

}
