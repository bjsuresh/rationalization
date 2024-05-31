import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImpactsComponent } from '../impacts/impacts.component';
import { ConsequencesComponent } from '../consequences/consequences.component';
import { CostFigComponent } from '../cost-fig/cost-fig.component';
import { RespondTimeComponent } from '../respond-time/respond-time.component';
import { ApiService } from '../api.service';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-prioritiy',
  templateUrl: './prioritiy.component.html',
  styleUrls: ['./prioritiy.component.css']
})
export class PrioritiyComponent {
  dataSource : any[] = [
    {
      id:1,
      plant: "IOCL BGR",
      area: "CPP",
      unit: "81",
      equipment: "Boiler",
      taggroup: "TagMain1",
      tagno: "C11",
      parameter: "PVHI",
      impact1: "",
      impact2:"",
      impact3: "",
      timetorespond: "",
      derivedpriority: "",
      accessedpriority: "",
      actualpriority: ""
    },
  ];

  dataSourceSeverity : any[] = [
    {
      id:1,
      Impact: 1,
      severity_low: 1,
      severity_medium: 2,
      severity_large: 3,
      severity_severe: 4
    },
    {
      id:2,
      Impact: 2,
      severity_low: 12,
      severity_medium: 5,
      severity_large: 6,
      severity_severe: 7
    },
    {
      id:3,
      Impact: 3,
      severity_low: 8,
      severity_medium: 9,
      severity_large: 10,
      severity_severe: 11
    }
  ];

  dataSourcePrioirity: any[] = [
    {
      id:1,
      maxtime: 1,
      severity_small: 0,
      severity_medium: 0,
      severity_severe: 0
    },
    {
      id:2,
      maxtime: 2,
      severity_small: 2,
      severity_medium: 3,
      severity_severe: 1
    },
    {
      id:3,
      maxtime: 3,
      severity_small: 2,
      severity_medium: 3,
      severity_severe: 2
    },
    {
      id:4,
      maxtime: 4,
      severity_small: 3,
      severity_medium: 2,
      severity_severe: 1
    }
  ];
  maxtimerespond : any[] = [
    {
      id:1,
      maxtime: ">T1",
    },
    {
      id:2,
      maxtime: "Between T1,T2"
    },
    {
      id:3,
      maxtime: "Between T2&T3",
    },
    {
      id:4,
      maxtime: "<T3",
    },
  ]
  severityLevels: any[] = [
    {
      id:0,
      level: "No Alarm"
    },
    {
      id:1,
      level: 1
    }, 
    {
      id:2,
      level: 2
    },
    {
      id:3,
      level: 3
    },
    {
      id:4,
      level: 4
    },
    {
      id:5,
      level: 5
    }
  ]
  impacts : any[] = [
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
      ImpactName: "Economic"
    }
  ];

  consequences : any[] = [
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
      ImpactName: "Economic"
    },
    {
      id:9,
      ConsequenceName: "Between C1 & C2 $",
      ImpactName: "Economic"
    },
    {
      id:10,
      ConsequenceName: "Between C3 & C4 $",
      ImpactName: "Economic"
    },
    {
      id:11,
      ConsequenceName: "Between C5 & C6 $",
      ImpactName: "Economic"
    },
    {
      id:12,
      ConsequenceName: "None",
      ImpactName: "Environment"
    },
  ];
  safetyCons: any[] = [];
  EnvironmentCons : any[] = [];
  EconomicCons : any[] = [];

  safetyDataSource: any[] = [];
  EnvironmentDataSource : any[] = [];
  EconomicDataSource : any[] = [];

  $event: any;
  
  constructor(
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private apiService: ApiService
  ){ }
  isOpenPopup: boolean = false;

  importPriority(){
    this.isOpenPopup = true;
  }
  file: any;
  fileName: any;

  onFileChange(event: any): void {
    console.log("ev",event);
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      this.fileName = file.name;

    }
  }
  import(){
    this.uploadFile(this.file);
  }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
  
    this.apiService.importTag(formData).subscribe(
      (response: any) => {
        console.log('File uploaded successfully:', response);
        this.isOpenPopup = false;

      },
      (error: any) => {
        console.error('Error adding user:', error);
        // Handle error
        this.isOpenPopup = false;

      }
    );
  }


  valueChanged(e:any) {
    console.log("evc",e);
    e.component.on('valueChanged', (args:any) => {
    console.log("args",args);
        const selectedImpact = this.impacts.find(impact => impact.id === args.value);
        console.log(selectedImpact.severity_low); // Or any other action you want
    });
  }
  onCellClick(e: any) {
    console.log("evc",e);

    if (e.column.dataField === "Impact") {
        console.log("Impact column clicked");
        // let PerArr: any[] = this.consequences.filter((item: { ImpactName: any; }) => item.ImpactName == Impact);
        // console.log("SafetyArr",PerArr); 
    }
  }
  onImpactValueChanged(e:any){
    console.log("Impact val selected",e);
  }
  // onEditorPrepared(e: any) {
  //   console.log("evc",e);

  //   if (e.dataField === "Impact") {
  //        e.editor.onValueChanged.subscribe((value: any) => {
  //           const newValue = value;
  //           console.log("Impact value changed to:", newValue);
  //       });
  //   }
  // }

  ngOnInit():void {

    // this.apiService.EnForceTagList().subscribe({next:(res:any) => {
    //  this.dataSource= JSON.parse(res)
    //  }});
    // const storedData = localStorage.getItem('severities');
    // this.dataSourceSeverity = storedData ? JSON.parse(storedData) : this.dataSource;
 
    const DataSourceSeverity = localStorage.getItem('severities');
    this.dataSourceSeverity = DataSourceSeverity ? JSON.parse(DataSourceSeverity) : this.dataSourceSeverity;
  
    const DataSourcePriorty = localStorage.getItem('priorities');
    this.dataSourcePrioirity = DataSourcePriorty ? JSON.parse(DataSourcePriorty) : this.dataSourcePrioirity;

    console.log("severity",this.dataSourceSeverity);

    this.safetyDataSource = this.dataSourceSeverity.filter((item: { Impact: any; }) => item.Impact == 1);
    this.safetyCons = this.consequences.filter((item: { ImpactName: any; }) => item.ImpactName == "Safety");
    console.log("SafetyArr",this.safetyCons);  

    this.EnvironmentDataSource = this.dataSourceSeverity.filter((item: { Impact: any; }) => item.Impact == 2);
    this.EnvironmentCons = this.consequences.filter((item: { ImpactName: any; }) => item.ImpactName == "Environment");
    console.log("Environment",this.EnvironmentCons);  

    this.EconomicDataSource = this.dataSourceSeverity.filter((item: { Impact: any; }) => item.Impact == 3);
    this.EconomicCons = this.consequences.filter((item: { ImpactName: any; }) => item.ImpactName == "Economic");
    console.log("Economic",this.EconomicCons);  

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
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Priority-Assists.xlsx"); 
          }); 
      }); 
  } 
  else if (e.format === 'pdf') {
      const doc = new jsPDF({
        orientation: 'landscape', // Set orientation to landscape
        format:[300, 400],
        unit: 'mm',
    });
      exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
          indent: 5,
        }).then(() => {
          doc.save('Priority-Assists.pdf');
      });
  }

  }
  saveSeverityDataToLocalStorage() {
    console.log("dts",this.dataSourceSeverity);
    const dataToSave = JSON.stringify(this.dataSourceSeverity);
    localStorage.setItem('severities', dataToSave);
  }
  savePriorityDataToLocalStorage() {
    console.log("dts",this.dataSourcePrioirity);
    const dataToSave = JSON.stringify(this.dataSourcePrioirity);
    localStorage.setItem('priorities', dataToSave);
  }

  openImpactsDialog() {
    const dialogRef = this.dialog.open(ImpactsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openConsequencesDialog() {
    const dialogRef = this.dialog.open(ConsequencesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openCostfigDialog() {
    const dialogRef = this.dialog.open(CostFigComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openRespondTimeDialog(){
    const dialogRef = this.dialog.open(RespondTimeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
  addSeverity(event:any){
    console.log("efvt",event.data);
    this.saveSeverityDataToLocalStorage();
  }
  
  updateSeverity(event:any){
    console.log("efvt",event)
    const id = event.key;
    const updateSeverity = event.newData;
    updateSeverity['id'] = id;
    this.saveSeverityDataToLocalStorage();

    console.log("updateSeverity",updateSeverity);
  }

  deleteSeverity(event:any){
    console.log("efvt",event.data)
    const deletedId = event.data.id;
    this.dataSource = this.dataSource.filter(item => item.id !== deletedId);
    this.saveSeverityDataToLocalStorage();
  }

  addPriority(event:any){
    console.log("efvt",event.data);
    this.savePriorityDataToLocalStorage();
  }
  
  updatePriority(event:any){
    console.log("efvt",event)
    const id = event.key;
    const updateSeverity = event.newData;
    updateSeverity['id'] = id;
    this.savePriorityDataToLocalStorage();
    console.log("updateSeverity",updateSeverity);
  }

  deletePriority(event:any){
    console.log("efvt",event.data)
    const deletedId = event.data.id;
    this.dataSource = this.dataSource.filter(item => item.id !== deletedId);
    this.savePriorityDataToLocalStorage();
  }

}