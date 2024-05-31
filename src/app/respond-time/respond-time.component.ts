import { Component } from '@angular/core';

@Component({
  selector: 'app-respond-time',
  templateUrl: './respond-time.component.html',
  styleUrls: ['./respond-time.component.css']
})
export class RespondTimeComponent {
  dataSource : any[] = [
    {
      id:1,
      time: "10 mins",
    },
    {
      id:2,
      time: "20 mins",
    },
    {
      id:3,
      time: "60 mins"
    },
    {
      id:4,
      time: "1 day"
    },
    {
      id:5,
      time: "7 days"
    }
  ];

  
  ngOnInit() {
    const storedData = localStorage.getItem('res_times');
    this.dataSource = storedData ? JSON.parse(storedData) : this.dataSource;
  }

  saveDataToLocalStorage() {
    console.log("dts",this.dataSource);
    const dataToSave = JSON.stringify(this.dataSource);
    localStorage.setItem('res_times', dataToSave);
  }

  addImpact(event:any){
    console.log("efvt",event.data);
    this.saveDataToLocalStorage();
  }

  
  updateImpact(event:any){
    console.log("efvt",event.data);
    this.saveDataToLocalStorage();
  }

  
  deleteImpact(event:any){
    console.log("efvt",event.data);
    const deletedId = event.data.id;
    this.dataSource = this.dataSource.filter(item => item.id !== deletedId);
    this.saveDataToLocalStorage();
  }

}
