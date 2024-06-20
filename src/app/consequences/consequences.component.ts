import { Component } from '@angular/core';

@Component({
  selector: 'app-consequences',
  templateUrl: './consequences.component.html',
  styleUrls: ['./consequences.component.css']
})
export class ConsequencesComponent {
  dataSource : any[] = [
    {
      id:1,
      ConsequenceName: "No injury or health impact",
      ImpactName: "Safety"
    },
    {
      id:2,
      ConsequenceName: "First aid injury, no lost time in production",
      ImpactName: "Safety"
    },
    {
      id:3,
      ConsequenceName: "Production lost time, No permanent disability",
      ImpactName: "Safety"
    },
    {
      id:4,
      ConsequenceName: "Production lost time, Permanent disability or death",
      ImpactName: "Safety"
    },
    {
      id:5,
      ConsequenceName: "Negligible financial; contained release; may need little clean up",
      ImpactName: "Environment"
    },
    {
      id:6,
      ConsequenceName: "May involve damage claims; can cause contamination & hospitalisation",
      ImpactName: "Environment"
    },
    {
      id:7,
      ConsequenceName: "Damage claims; large scale hospitalisation or death or contamination.",
      ImpactName: "Environment"
    },
    {
      id:8,
      ConsequenceName: "Below C1",
      ImpactName: "Financial"
    },
    {
      id:9,
      ConsequenceName: "Between C1 & C2 $",
      ImpactName: "Financial"
    },
    {
      id:10,
      ConsequenceName: "Between C3 & C4 $",
      ImpactName: "Financial"
    },
    {
      id:11,
      ConsequenceName: "Between C5 & C6 $",
      ImpactName: "Financial"
    },
    {
      id:12,
      ConsequenceName: "None",
      ImpactName: "Environment"
    },
  ];
  impacts : any[] = [
    {
      id:1,
      ImpactName: "Safety"
    },
    {
      id:2,
      ImpactName: "Environment"
    },
    {
      id:3,
      ImpactName: "Financial"
    }
  ];

  ngOnInit() {
    const storedData = localStorage.getItem('consequences');
   
    if (storedData) {
      this.dataSource = JSON.parse(storedData);
    }
  }

  saveDataToLocalStorage() {
    console.log("dts",this.dataSource);
    const dataToSave = JSON.stringify(this.dataSource);
    localStorage.setItem('consequences', dataToSave);
  }

  addConsequence(event:any){
    console.log("efvt",event.data);
    this.saveDataToLocalStorage();
  }

  updateConsequence(event:any){
    console.log("efvt",event.data)
  }
  
  deleteConsequence(event:any){
    console.log("efvt",event.data);
    const deletedId = event.data.id;
    this.dataSource = this.dataSource.filter(item => item.id !== deletedId);
    this.saveDataToLocalStorage();
  }

}
