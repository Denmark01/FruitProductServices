import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  event_list : any = [
    {
      event:' Event 1',
      eventLocation:'Bangalore',
      eventDescription:'Bangalore event',
      img: 'assets/image/banner_1.jpg',
      eventStartDate: new Date('2019/05/20'),
      eventEndingDate: new Date('2019/05/24')
    },
     {
      event:' Event 2',
      eventLocation:'Dubai',
      eventDescription:'Dubai event',
      img: 'assets/image/banner_2.jpg',
      eventStartDate: new Date('2019/07/28'),
      eventEndingDate: new Date('2019/07/30')
    },
     {
      event:' Event 3',
      eventLocation:'New York',
      eventDescription:'NewYork event',
      img: 'assets/image/banner_3.jpg',
      eventStartDate: new Date('2020/05/20'),
      eventEndingDate: new Date('2020/05/24')
    },
     {
      event:' Event 4',
      eventLocation:'Singapore',
      eventDescription:'Singapore event',
      img: 'assets/image/banner_1.jpg',
      eventStartDate: new Date('2018/05/20'),
      eventEndingDate: new Date('2018/05/24')
    },
    {
      event:' Event 5',
      eventLocation:'Berlin',
      eventDescription: 'Berlin event',
      img: 'assets/image/banner_2.jpg',
      eventStartDate: new Date('2017/07/10'),
      eventEndingDate: new Date('2017/08/14')
    },
    {
      event:' Event 6',
      eventLocation:'Mumbai',
      eventDescription:'Mumbai event',
      img: 'assets/image/banner_3.jpg',
      eventStartDate: new Date(),
      eventEndingDate: new Date()
    },
    {
      event:' Event 7',
      eventLocation:'Barcelona',
      eventDescription:'Barcelona event',
      img: 'assets/image/banner_1.jpg',
      eventStartDate: new Date(),
      eventEndingDate: new Date()
    },
  ]

  upcoming_events =  this.event_list.filter( event => event.eventStartDate > new Date());
  past_events = this.event_list.filter(event => event.eventEndingDate < new Date());
  current_events =  this.event_list.filter( event => (event.eventStartDate >= new Date() && (event.eventEndingDate <= new Date())))
}
