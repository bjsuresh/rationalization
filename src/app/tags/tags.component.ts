import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../shared.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { ApiService } from '../api.service';
import { AddchangeRequestComponent } from '../addchange-request/addchange-request.component';
import { MatDialog } from '@angular/material/dialog';
import { Workbook } from 'exceljs';
import jsPDF from 'jspdf';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { ViewAssistComponent } from '../view-assist/view-assist.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})

export class TagsComponent {
  displayedColumns: string[] = ['select', 'tagid', 'separator', 'channelid', 'taggroup', 'tagname', 'parameter', 'tagtype', 'equipment', 'unit', 'area', 'plant'];
 
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  popupPosition : any;

  dataSource:any = [];
  // {
  //   id:1,
  //   separator: "",
  //   channelid: "",
  //   tagid: "",
  //   taggroup: "TagMain1",
  //   tagname: "10FI C11",
  //   parameter: "PVHI",
  //   tagtype: "AI",
  //   designvalue:"65",
  //   opcvalue: "95",
  //   equipment: "Boiler",
  //   unit: "81",
  //   area: "CPP",
  //   plant: "IOCL BGR"
  // },
  // {
  //   id:2,
  //   separator: "",
  //   channelid: "",
  //   tagid: "",
  //   taggroup: "TagMain1",
  //   tagname: "10FIC12",
  //   parameter: "PVHI",
  //   tagtype: "AI",
  //   designvalue:"70",
  //   opcvalue: "77",
  //   equipment: "Boiler",
  //   unit: "81",
  //   area: "CPP",
  //   plant: "IOCL BGR"
  // }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
    // {
    //   id:1,
    //   separator: "",
    //   channelid: "",
    //   tagid: "",
    //   taggroup: "TagMain1",
    //   tagname: "10FIC11",
    //   parameter: "PVHI",
    //   tagtype: "AI",
    //   designvalue:"65",
    //   opcvalue: "95",
    //   equipment: "Boiler",
    //   unit: "81",
    //   area: "CPP",
    //   plant: "IOCL BGR"
    // },
    // {
    //   id:2,
    //   separator: "",
    //   channelid: "",
    //   tagid: "",
    //   taggroup: "TagMain1",
    //   tagname: "10FIC12",
    //   parameter: "PVHI",
    //   tagtype: "AI",
    //   designvalue:"70",
    //   opcvalue: "77",
    //   equipment: "Boiler",
    //   unit: "81",
    //   area: "CPP",
    //   plant: "IOCL BGR"
    // }
      // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  tagnames: any = [
    {
      id:1,
      name: '10FIC11'
    },
    {
      id:2,
      name: '10FIC12'
    },
    {
      id:3,
      name: '10FIC13'
    }
  ]
  constructor(
    private sharedService: SharedService,
    private apiService: ApiService,
    public dialog: MatDialog
    ) {
    this.popupPosition = {
      of: window, at: 'top', my: 'top', offset: { y: 10 },
    };
  }

  ngOnInit(): void {
    this.sharedService.readExcelFromAsset()
      .then((data: any[]) => {
        console.log('Excel data:', data);
        // Process the Excel data as needed
        const headers = data[0];
  
        // Remove the header row and convert the rest of the rows to objects
         this.dataSource = data.slice(1).map((row, index) => {
          const obj: any = { id: index + 1 };
        
          headers.forEach((header: string, colIndex: string | number) => {
            obj[header.toLowerCase()] = row[colIndex];
          });
        
          return obj;
        });
        
        console.log('Transformed Data:', this.dataSource);
      
      })
      .catch((error) => {
        console.error('Error reading Excel file:', error);
      });

  //   this.apiService.TagSelection().subscribe({next:(res:any) => {
  //     this.dataSource= JSON.parse(res)
  //     }  
  // });
  }


  selectStatus(data:any) {
    if (data.value == 'All') {
      this.dataGrid.instance.clearFilter();
    } else {
      this.dataGrid.instance.filter(['tagname', '=', data.value]);
    }
  }

  openRequestDialog(){
    const dialogRef = this.dialog.open(AddchangeRequestComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openAssistDialog(){
    const dialogRef = this.dialog.open(ViewAssistComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  onExporting(e: any) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
      }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer:any) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Tags.xlsx"); 
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
          doc.save('Tags.pdf');
      });
  }

  }
}