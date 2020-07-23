import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor() { }
  @Output() messageEvent = new EventEmitter<string>();
  public serText: string;
  ngOnInit() {
  }
  sendMessage(event) {
    this.messageEvent.emit(event);

 }
}

