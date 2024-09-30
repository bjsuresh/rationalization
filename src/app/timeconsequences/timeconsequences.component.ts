import { Component } from '@angular/core';

@Component({
  selector: 'app-timeconsequences',
  templateUrl: './timeconsequences.component.html',
  styleUrls: ['./timeconsequences.component.css']
})
export class TimeconsequencesComponent {
    dataSource : any[] = [
      {
        id:1,
        ttc: "Immedidate outside operator",
        value:5
      },
      {
        id:2,
        ttc: "Immedidate inside operator",
        value:4
      },
      {
        id:3,
        ttc: "<5 minutes outside operator",
        value:3
      },
      {
        id:4,
        ttc: "<5 minutes inside operator",
        value:2
      },
      {
        id:5,
        ttc: ">5 minutes",
        value:1
      }
    ];
  
    ngOnInit() {
      const storedData = localStorage.getItem('time2consequences');
      this.dataSource = storedData ? JSON.parse(storedData) : this.dataSource;
    }
  
    saveDataToLocalStorage() {
      console.log("dts",this.dataSource);
      const dataToSave = JSON.stringify(this.dataSource);
      localStorage.setItem('time2consequences', dataToSave);
    }
   
    addImpact(event: any) {
      const newIndex = this.getNextIndexNo();
      event.data.value = newIndex;
      const newId = this.getIdNo();
      event.data.id = newId;
    }

    onRowInserted(event: any) {
      // this.dataSource.push(event.data); // Add the new data to the data source
      console.log("adds", event.data.value, event.data);
      this.saveDataToLocalStorage();
    }

    updateImpact(event: any) {
      const id = event.key;
      const updatedData = { ...event.oldData, ...event.newData };
      const index = this.dataSource.findIndex(item => item.id === id);
      if (index !== -1) {
        this.dataSource[index] = updatedData;
      }
      this.saveDataToLocalStorage();
      console.log("updatedData", updatedData);
    }
    getNextIndexNo(): number {
      const maxIndex = this.dataSource.reduce((max, item) => Math.max(max, +item.value), 0);
      return maxIndex + 1;
    }
    getIdNo(): number {
      const maxIndex = this.dataSource.reduce((max, item) => Math.max(max, +item.id), 0);
      return maxIndex + 1;
    }
    deleteImpact(event:any){
      console.log("efvt",event.data)
      const deletedId = event.data.id;
      this.dataSource = this.dataSource.filter(item => item.id !== deletedId);
      this.saveDataToLocalStorage();
    }
  
  }
  