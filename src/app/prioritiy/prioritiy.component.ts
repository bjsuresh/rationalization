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
import { HazardsComponent } from '../hazards/hazards.component';
import { TimeconsequencesComponent } from '../timeconsequences/timeconsequences.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      impact1: "medium",
      impact2:"large",
      impact3: "small",
      timetorespond: "10",
      derivedpriority: "PE",
      accessedpriority: "large",
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
  hazards : any[] = [
    {
      id:1,
      eventName: "Vessel Over Pressure / Over Temperature",
      value:5
    },
    {
      id:2,
      eventName: "HC release to atmosphere / liquid release to atmosphere",
      value:4
    },
    {
      id:3,
      eventName: "Mechanical failure / loss of control",
      value:3
    },
    {
      id:4,
      eventName: "Critical flow off spec",
      value:2
    },
    {
      id:5,
      eventName: "Plant optimisation",
      value:1
    }
  ];
  time2consequences : any[] = [
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
  sizes: any[] = ['small','medium','large','verylarge'];

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
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ){ 
    this.updateDerivedPriorities();
  }
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
  updateDerivedPriorities() {
    const dataSource = localStorage.getItem('priorities');
    this.dataSource = dataSource ? JSON.parse(dataSource) : this.dataSource;

    function getMaxPriority(impact1: string, impact2: string, impact3: string): string {
      const priorities = { PS: impact1, PE: impact2, PF: impact3 };
      const priorityLevels = ["small", "medium", "large", "verylarge"];
      let maxPriority = "small";
      let factor = "PS";
  
      for (const key in priorities) {
          if (priorityLevels.indexOf(priorities[key]) > priorityLevels.indexOf(maxPriority)) {
              maxPriority = priorities[key];
              factor = key;
          }
      }
  
      return `${factor} (${maxPriority})`;
    }

    this.dataSource.forEach(item => {
      item.derivedpriority = getMaxPriority(item.impact1, item.impact2, item.impact3);
    });

    console.log(this.dataSource);
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
    this.getData();
    const max = localStorage.getItem('maxHeader');
    this.maxHeader = max ? JSON.parse(max) : this.maxHeader;

    const priorityintervals = localStorage.getItem('intervals');
    this.intervals = priorityintervals ? JSON.parse(priorityintervals) : this.intervals;
    this.generateAlarmPriorities();
  }

  xHeaders: number[] = [];
  yHeaders: number[] = [];
  matrix: number[][] = [];
  maxHeader: number = 5;
  maxXHeader: any;
  maxYHeader: any;
  // Intervals for alarm priorities
  intervals: { [key: string]: [number, number] } = {
    P1: [25, 50],
    P2: [10, 24],
    P3: [6, 9],
    Alert: [1, 5]
  };
  isOpenInterval: boolean = false;

  alarmPriorities: { priority: string, range: string }[] = [];
  openPI(){
    this.isOpenInterval = true;
  }
  generateMatrix() {
    this.xHeaders = Array.from({ length: this.maxXHeader }, (_, i) => i + 1);
    this.yHeaders = Array.from({ length: this.maxYHeader }, (_, i) => i + 1);
    this.matrix = this.yHeaders.map(y => this.xHeaders.map(x => x * y));
  }

  generateAlarmPriorities() {
    this.alarmPriorities = Object.keys(this.intervals).map(priority => ({
      priority: priority,
      range: `${this.intervals[priority][0]}-${this.intervals[priority][1]}`
    }));
  }

  updateInterval(priority: string, from: number, to: number) {
    this.intervals[priority] = [from, to];
    localStorage.setItem('intervals',JSON.stringify(this.intervals));
    this.snackBar.open('Priority Intervals Updated','',{
      duration: 1000
    });
    this.generateAlarmPriorities();
  }
  updateMaxHeader(value: number) {
    this.maxHeader = value;
    localStorage.setItem('maxHeader',JSON.stringify(this.maxHeader));
    this.snackBar.open('Max Header Updated','',{
      duration: 1000
    });
    this.generateMatrix();
  }
  customizeLabelText = (scaleValue: { value: number }) => {
    if (scaleValue.value < 10) {
        return 'Instrument Calibaration Range (min)';
    } 
    else if (scaleValue.value < 20) {
        return 'Lower safe operating limit';
    }
    else if (scaleValue.value < 30) {
      return 'Low Low Alarm Trip';
    }
    else if (scaleValue.value < 40) {
      return 'Low Alarm';
    }
    else if (scaleValue.value < 50) {
      return 'Lower Operating Limit';
    }
    else if (scaleValue.value < 60) {
      return 'Operating Target';
    }
    else if (scaleValue.value < 70) {
      return 'Upper Operating Limit';
    }
    else if (scaleValue.value < 80) {
      return 'High Alarm';
    }
    else if (scaleValue.value < 90) {
      return 'High High Alarm/Trip';
    }
    else if (scaleValue.value < 100) {
      return 'Upper Safe Operating Limit';
    }
    else {                                                                                                                                         
      return 'Instrument Calibaration Range (max)';
    }
};
  getData(){
    const storedData2 = localStorage.getItem('hazards');
    const hazards = storedData2 ? JSON.parse(storedData2) : this.hazards;
    const maxXValue = Math.max(...hazards.map(item => item.value));
    this.maxXHeader = maxXValue;

    const storedData1 = localStorage.getItem('time2consequences');
    const tc = storedData1 ? JSON.parse(storedData1) : this.time2consequences;
    const maxYValue = Math.max(...tc.map(item => item.value));
    this.maxYHeader = maxYValue;
    this.generateMatrix();

    const storedData = localStorage.getItem('consequences');
    this.consequences = storedData ? JSON.parse(storedData) : this.consequences;
 
    const DataSourceSeverity = localStorage.getItem('severities');
    this.dataSourceSeverity = DataSourceSeverity ? JSON.parse(DataSourceSeverity) : this.dataSourceSeverity;
  
    const DataSourcePriorty = localStorage.getItem('priorities');
    this.dataSourcePrioirity = DataSourcePriorty ? JSON.parse(DataSourcePriorty) : this.dataSourcePrioirity;

    console.log("severity",this.dataSourceSeverity);

    this.safetyDataSource = this.consequences.filter((item: { ImpactName: any; }) => item.ImpactName == "Safety");
    this.safetyCons = this.consequences.filter((item: { ImpactName: any; }) => item.ImpactName == "Safety");
    console.log("SafetyArr",this.safetyCons);  
    let safetyConsFiltered = this.safetyCons.filter((item) => item.ImpactName == "Safety");
    console.log("SafetyArr", safetyConsFiltered);
    // safetyConsFiltered.forEach(safetyItem => {
    //   if (safetyItem.Size === "small") {
    //     this.dataSourceSeverity.forEach(severityItem => {
    //       if (severityItem.Impact === 1) {
    //         console.log("severityItem",severityItem)
    //         severityItem.severity_low = severityItem.id;
    //       }
    //     });
    //   }
    // });
  
  console.log("Updated dataSourceSeverity", this.consequences);
    // this.EnvironmentDataSource = this.dataSourceSeverity.filter((item: { Impact: any; }) => item.Impact == 2);
    this.EnvironmentDataSource = this.consequences.filter((item: { ImpactName: any; }) => item.ImpactName == "Environment");
    console.log("Environment",this.EnvironmentDataSource);  

    // this.EconomicDataSource = this.dataSourceSeverity.filter((item: { Impact: any; }) => item.Impact == 3);
    this.EconomicDataSource = this.consequences.filter((item: { ImpactName: any; }) => item.ImpactName == "Financial");
    console.log("Economic",this.EconomicDataSource);  

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
    this.updateDerivedPriorities();
    console.log("dts",this.dataSource);
    const dataToSave = JSON.stringify(this.dataSource);
    localStorage.setItem('priorities', dataToSave);
  }
  openHazardsDialog(){
    const dialogRef = this.dialog.open(HazardsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getData();
    });
  }
  openTTCDialog(){
    const dialogRef = this.dialog.open(TimeconsequencesComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getData();
    });
  }
  openImpactsDialog() {
    const dialogRef = this.dialog.open(ImpactsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getData();
    });
  }

  openConsequencesDialog() {
    const dialogRef = this.dialog.open(ConsequencesComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getData();
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