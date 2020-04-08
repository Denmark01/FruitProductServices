import { Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataShareService } from './services/data-share.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
public data: any;
constructor(
  private modalService: NgbModal,
  private route: Router,
  private service: DataShareService
  ) {}

// tslint:disable-next-line: use-life-cycle-interface
ngOnInit() {
  console.log('Current url ' + this.route.url);
  const s = location.href;
  console.log('path ' + s.substring(0, s.lastIndexOf('0') + 1));
  this.service.setUrl( s.substring(0, s.lastIndexOf('0') + 1));
}

}
