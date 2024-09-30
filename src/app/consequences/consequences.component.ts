import { Component } from '@angular/core';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import jsPDF from 'jspdf';

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
      ImpactName: "Safety",
      Size: "small",
      Numeric_measure: "<0.001"
    },
    {
      id:2,
      ConsequenceName: "First aid injury, no lost time in production",
      ImpactName: "Safety",
      Size: "medium",
      Numeric_measure: "0.001 to 0.01"
    },
    {
      id:3,
      ConsequenceName: "Production lost time, No permanent disability",
      ImpactName: "Safety",
      Size: "large",
      Numeric_measure: "0.01 to 0.1"
    },
    {
      id:4,
      ConsequenceName: "Production lost time, Permanent disability or death",
      ImpactName: "Safety",
      Size: "verylarge",
      Numeric_measure: ">0.1"
    },
    {
      id:5,
      ConsequenceName: "Negligible financial; contained release; may need little clean up",
      ImpactName: "Environment",
      Size: "small",
      Numeric_measure: "<0.001"
    },
    {
      id:6,
      ConsequenceName: "May involve damage claims; can cause contamination & hospitalisation",
      ImpactName: "Environment",
      Size: "medium",
      Numeric_measure: "0.001 to 0.01"

    },
    {
      id:7,
      ConsequenceName: "Damage claims; large scale hospitalisation or death or contamination.",
      ImpactName: "Environment",
      Size: "large",
      Numeric_measure: "0.01 to 0.1"
    },
    {
      id:8,
      ConsequenceName: "situation with real potential for serious breach of environmemtal effects",
      ImpactName: "Environment",
      Size: "verylarge",
      Numeric_measure: ">0.1"    
    },
    {
      id:9,
      ConsequenceName: "No immediate likelihood of plant damage, Minor loss in productivity or efficiency",
      ImpactName: "Financial",
      Size: "small",
      Numeric_measure: "<1000"    
    },
    {
      id:10,
      ConsequenceName: "Some chance of minor plant damage. Significant reduction in plant output",
      ImpactName: "Financial",
      Size: "medium",
      Numeric_measure: "1000 to 10000"    
    },
    {
      id:11,
      ConsequenceName: "High chance of minor plant damage, Significant loss of production",
      ImpactName: "Financial",
      Size: "large",
      Numeric_measure: "10000 to 100000"    
    },
    {
      id:12,
      ConsequenceName: "High chance of serious plant damage,Seious and prolonged output",
      ImpactName: "Financial",
      Size: "verylarge",
      Numeric_measure: ">100000"
    }
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
  sizes: any[] = ['small','medium','large','verylarge'];
  ngOnInit() {
    // const dataToSave = JSON.stringify(this.dataSource);
    // localStorage.setItem('consequences', dataToSave);

    const storedData = localStorage.getItem('consequences');
    if (storedData) {
      this.dataSource = JSON.parse(storedData);
    }
  }

  exportGrid(e:any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
      }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer:any) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Operator-Assists.xlsx"); 
          }); 
      }); 
  } 
  else if (e.format === 'pdf') {
      const doc = new jsPDF({
        orientation: 'landscape', // Set orientation to landscape
        format:[500, 300],
        unit: 'mm',
    });
      // exportDataGridToPdf
      // {
      //     jsPDFDocument: doc,
      //     component: e.component,
      //     indent: 5,
      //   }).then(() => {
      //     doc.save('Operator-Assists.pdf');
      // });
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
