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
  selector: 'app-enforceed-tags',
  templateUrl: './enforceed-tags.component.html',
  styleUrls: ['./enforceed-tags.component.css']
})
export class EnforceedTagsComponent {
  dataSource : any[] = [
    {
      id:1,
      tagname: "10FIC11",
      parameter: "PVHI",
      proposedValue: "65"
    },
    {
      id:2,
      tagname: "10FIC12",
      parameter: "PVHI",
      proposedValue: "76"
    }
  ];
  constructor(
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private apiService: ApiService 
  ){}

  ngOnInit():void {

    // this.apiService.EnForceTagList().subscribe({next:(res:any) => {
    //  this.dataSource= JSON.parse(res)
    //  }});

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
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "EnforceTagList.xlsx"); 
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
          doc.save('EnforceTagList.pdf');
      });
  }

  }

}
