import { Component } from '@angular/core';

@Component({
  selector: 'app-impacts',
  templateUrl: './impacts.component.html',
  styleUrls: ['./impacts.component.css']
})
export class ImpactsComponent {
  dataSource : any[] = [
    {
      id:1,
      ImpactName: "Safety",
    },
    {
      id:2,
      ImpactName: "Environment",
    },
    {
      id:3,
      ImpactName: "Financial"
    },
    {
      id:4,
      ImpactName: "Customer"
    }
  ];

  ngOnInit() {
    const storedData = localStorage.getItem('impacts');
    this.dataSource = storedData ? JSON.parse(storedData) : this.dataSource;
  }

  saveDataToLocalStorage() {
    console.log("dts",this.dataSource);
    const dataToSave = JSON.stringify(this.dataSource);
    localStorage.setItem('impacts', dataToSave);
  }

  addImpact(event:any){
    console.log("efvt",event.data);
    this.saveDataToLocalStorage();
  }
  
  updateImpact(event:any){
    console.log("efvt",event)
    const id = event.key;
    const updatedUser = event.newData;
    updatedUser['id'] = id;
    this.saveDataToLocalStorage();

    console.log("updatedUser",updatedUser);
  }

  deleteImpact(event:any){
    console.log("efvt",event.data)
    const deletedId = event.data.id;
    this.dataSource = this.dataSource.filter(item => item.id !== deletedId);
    this.saveDataToLocalStorage();
  }

}
