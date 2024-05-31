import { Component } from '@angular/core';

@Component({
  selector: 'app-cost-fig',
  templateUrl: './cost-fig.component.html',
  styleUrls: ['./cost-fig.component.css']
})
export class CostFigComponent {
  dataSource : any[] = [
    {
      id:1,
      Costfigure: 100,
    },
    {
      id:2,
      Costfigure: 1000,
    },
    {
      id:3,
      Costfigure: 5000
    }
  ];

  ngOnInit() {
    const storedData = localStorage.getItem('costfigs');
    this.dataSource = storedData ? JSON.parse(storedData) : this.dataSource;
  }
  saveDataToLocalStorage() {
    console.log("dts",this.dataSource);
    const dataToSave = JSON.stringify(this.dataSource);
    localStorage.setItem('costfigs', dataToSave);
  }
  addImpact(event:any){
    console.log("efvt",event.data);
    this.saveDataToLocalStorage();
  }

  updateImpact(event:any){
    console.log("efvt",event.data)
  }

  deleteImpact(event:any){
    console.log("efvt",event.data);
    const deletedId = event.data.id;
    this.dataSource = this.dataSource.filter(item => item.id !== deletedId);
    this.saveDataToLocalStorage();
  }

}
