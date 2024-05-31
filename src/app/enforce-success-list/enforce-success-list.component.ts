import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-enforce-success-list',
  templateUrl: './enforce-success-list.component.html',
  styleUrls: ['./enforce-success-list.component.css']
})
export class EnforceSuccessListComponent {
  dataSource : any[] = [
    {
      id:1,
      TagName: "10FIC11",
      Parameter: "PVHI",
      New_Value: "65",
      Requested_Time: "27/03/24 12:30 P.M",
      Requestor: "admin",
      Enforced_Time: "27/03/24 1:32 P.M",
      OPCServer: "SAMA DA Server"
    },
    {
      id:2,
      TagName: "10FIC13",
      Parameter: "PVHI",
      New_Value: "71",
      Requested_Time: "27/03/24 01:30 P.M",
      Requestor: "admin",
      Enforced_Time: "27/03/24 2:04 P.M",
      OPCServer: "SAMA DA Server"
    },
    {
      id:3,
      TagName: "10FIC15",
      Parameter: "PVHI",
      New_Value: "80",
      Requested_Time: "27/03/24 02:20 P.M",
      Requestor: "admin",
      Enforced_Time: "27/03/24 6:32 P.M",
      OPCServer: "SAMA DA Server"
    }
  ];

  constructor(
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private apiService: ApiService) {
      
    }
    ngOnInit():void {

      // this.apiService.EnforceSuccessList().subscribe({next:(res:any) => {
      //  this.dataSource= JSON.parse(res)
      //  console.log(this.dataSource)
      //  }  
      //  });
  
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
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "EnforceSuccessList.xlsx"); 
            }); 
        }); 
    } 
    else if (e.format === 'pdf') {
        const doc = new jsPDF({
          orientation: 'landscape', // Set orientation to landscape
          format:[400, 600],
          unit: 'mm',
      });
        exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component,
            indent: 5,
          }).then(() => {
            doc.save('EnforceSuccessList.pdf');
        });
    }
  
    }
  
  }
