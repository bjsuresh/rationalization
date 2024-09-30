import { ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../shared.service';
import { MatDialog } from '@angular/material/dialog';
import { TagSelectionComponent } from '../tag-selection/tag-selection.component';
import { ImportChangeRequestComponent } from '../import-change-request/import-change-request.component';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CompareViewComponent } from '../compare-view/compare-view.component';
import { TagsComponent } from '../tags/tags.component';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-rationalisation',
  templateUrl: './rationalisation.component.html',
  styleUrls: ['./rationalisation.component.css']
})


export class RationalisationComponent {
  
  // displayedColumns: string[] = [ 'TagGroup', 'TagName', 'Parameter', 'TagType', 'DesignValue', 'Equipment', 'Unit', 'Area', 'Plant'];
  // dataSource = new MatTableDataSource();
    dataSource: any[] = [
    {
      tagNumber: "10FIC11",
      currentSettingValue:"65",
      parameter: "PVHI",
      eu:"kg/h",
      safeOperatatingLimit:"SOL-L",
      purposeOfMeasurement: "ML TO 10F-R-121 Flow %DEV.L",
      purposeOfAlarm:"To detect flow deviation low and prevent clogging",
      causes:"10FCV-1235 struck closed",
      CorrectiveActionsByPanelOperator: "Break control ML and put in manual, Infrom Maintenance",
      CorrectiveActionsByFieldOperator: "Mnually open 10-FCV-1235 valve",
      Consequences: "Possible density increase resulting loss of production",
      OperatorResponseTime: "5-15",
      AvailableProcessResponseClass:">15 mins",
      safetyConsequence: "No/Slight Injury",
      environmentConsequence: "No/Slight Effect",
      financeConsequence: "Medium Effect (100K - 1M)",
      overallPriority: "MEDIUM",
      remarks: ""
    },
    {
      tagNumber: "10FIC11",
      currentSettingValue:"255",
      parameter: "HI",
      eu:"C",
      safeOperatatingLimit:"SOL-H",
      purposeOfMeasurement: "1-c312A MIDDLE Temp H",
      purposeOfAlarm:"To detect high temperature during regeneration and pre alarm for TI-382-HH",
      causes:"During Regeneration",
      CorrectiveActionsByPanelOperator: "-",
      CorrectiveActionsByFieldOperator: "-",
      Consequences: "10TI-322 HH will eventually trigger",
      OperatorResponseTime: "-",
      AvailableProcessResponseClass:"N/A",
      safetyConsequence: "N/A",
      environmentConsequence: "N/A",
      financeConsequence: "N/A",
      overallPriority: "JOURNAL",
      remarks: "This alarm willl be journal due to insufficient response time"
    },

  ];

  plants: any[] = [
    "IOCL BGR","Plant2","Plant3"
  ];
  plant=this.plants[0];
  areas: any[] = [
    "CPP","Area2","Area3"
  ];
  area=this.areas[0];
  units: any[] = [
    "81","82","83","84","85"
  ];
  unit=this.units[0];

  dataSource1 : any[] = [
  {
    id:1,
    processmode: "Feed Mix ",
    processmodeid: "ProcessmodeID",
    taggroup: "TagMain1",
    tagname: "10FIC11",
    parameter: "PVHI",
    tagtype: "AI",
    designvalue:"65",
    opcvalue: "95",
    equipment: "Boiler",
    unit: "81",
    area: "CPP",
    plant: "IOCL BGR"
  },
  {
    id:2,
    processmode: "Feed Mix ",
    processmodeid: "ProcessmodeID",
    taggroup: "TagMain1",
    tagname: "10FIC12",
    parameter: "PVHI",
    tagtype: "AI",
    designvalue:"70",
    opcvalue: "77",
    equipment: "Boiler",
    unit: "81",
    area: "CPP",
    plant: "IOCL BGR"
  }
  ];

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  openDialog() {
    const dialogRef = this.dialog.open(TagsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openCompareView(){
    const dialogRef = this.dialog.open(CompareViewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  addChangeRequest(){
    const dialogRef = this.dialog.open(ImportChangeRequestComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  menus: any[] = [
    // {
    //   id: 0,
    //   text: 'Home',
    // },
    // {
    //   id: 1,
    //   text: 'Change Requests',
    // },
  ]

  change_requests: any = [
    // {
    //   id:1,
    //   ChangeRequestName: 'I_Test-A',
    //   Processmode: 'Feed Mix',
    //   Proposed_by: 'admin',
    //   Proposed_date: '17/01/24 01:00 P.M',
    //   Proposed_tags: 'Proposed Tags',
    //   Enforced_tags: 'Enforced Tags',
    //   Dis_approve: 'Dis Approve'
    // },
    // {
    //   id:2,
    //   ChangeRequestName: 'I_IOCL_BGR',
    //   Processmode: 'Feed Mix',
    //   Proposed_by: 'admin',
    //   Proposed_date: '19/01/24 05:00 P.M',
    //   Proposed_tags: 'Proposed Tags',
    //   Enforced_tags: 'Enforced Tags',
    //   Dis_approve: 'Dis Approve'
    // },
  ];

  selectedTab = 'Home';

  customizeColumns(columns:any) {
    columns[0].width = 70;
  }
  data: any; 
  constructor(
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private apiService: ApiService) {
      
    }

  ngOnInit(): void {
    this.sharedService.readExcelFromAsset()
      .then((data: any[]) => {
        console.log('Excel data:', data);
        // Process the Excel data as needed
        const headers = data[0];
  
        // Remove the header row and convert the rest of the rows to objects
         this.dataSource1 = data.slice(1).map((row, index) => {
          const obj: any = { id: index + 1 };
        
          headers.forEach((header: string, colIndex: string | number) => {
            obj[header.toLowerCase()] = row[colIndex];
          });
        
          return obj;
        });
        
        console.log('Transformed Data:', this.dataSource1);
      
      })
      .catch((error) => {
        console.error('Error reading Excel file:', error);
      });

    this.sharedService.setPageName('Rationalization');
    this.cdr.detectChanges();

    // this.apiService.Rationalisation().subscribe({next:(res:any) => {
    //   // const abc=JSON.stringify(res)
    //  this.dataSource1= JSON.parse(res)
    // //  console.log(this.dataSource1)
    //  }  
    
    //  });

    //  this.apiService.ChangeRequest().subscribe({next:(res:any) => {
    //  this.change_requests=JSON.parse(res)

    //  } 
    
    // });

  }

  

  navigateToDetailsPage(tag: string): void {
    // Assuming you have a route named '/tag-details' for displaying tag details
    this.router.navigate(['/tag-details', tag]);
  }
  onCellClick(e: any) {
    console.log('Comment Cell Clicked!', e,e.data);

    if (e.column && e.column.caption === 'Proposed tags') { 
      this.router.navigate(['home/proposed_tags']);
    }
    else if (e.column && e.column.caption === 'Enforced tags') {
      this.router.navigate(['home/enforce_tags']);
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
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Rationalise-Tags.xlsx"); 
          }); 
      });
  } 
  else if (e.format === 'pdf') {
      const doc = new jsPDF({
        orientation: 'landscape', // Set orientation to landscape
        format:[800, 1100],
        unit: 'mm',
    });
      exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
          indent: 5,
        }).then(() => {
          doc.save('Rationalise-Tags.pdf');
      });
  }

  }

  
}
