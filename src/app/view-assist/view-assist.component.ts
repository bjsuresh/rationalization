import { Component } from '@angular/core';

@Component({
  selector: 'app-view-assist',
  templateUrl: './view-assist.component.html',
  styleUrls: ['./view-assist.component.css']
})
export class ViewAssistComponent {
  dataSource : any[] = [
    {
      id:1,
      tag: "10FIC11",
      type: "PVHI",
      cause_of_alarm: "low gas level detected",
      consequence_of_alarm: "Potential for gas cloud build up yo high explosive linits",
      time: "immediate < 5 mins",
      EffTime: "",
      operator_response: "Verfy automatic acction to be taken, follow instructions",
      comments: "just checking testing",
      reviewBy: "admin"
    },
    {
      id:2,
      tag: "10FIC12",
      type: "PVHI",
      cause_of_alarm: "low gas level detected",
      consequence_of_alarm: "Potential for gas cloud build up yo high explosive linits",
      time: "immediate < 5 mins",
      EffTime: "",
      operator_response: "if device inhibited removed to initiate shutdown",
      comments: "Testing levels",
      reviewBy: "admin"
    }
  ];


  ngOnInit() {
    const storedData = localStorage.getItem('alrm_assists');
    this.dataSource = storedData ? JSON.parse(storedData) : this.dataSource;
  }
}
