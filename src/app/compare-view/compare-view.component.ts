import { Component, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf'
import { Workbook } from 'exceljs';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-compare-view',
  templateUrl: './compare-view.component.html',
  styleUrls: ['./compare-view.component.css']
})
export class CompareViewComponent {
  maindataSource : any[] = [];
  // @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  
    constructor(
      private sharedService: SharedService,
      private router: Router,
      private apiService: ApiService
    ) {

    }  

    customizeColumns(columns: any) {
  
      console.log("co",columns);
      for (let column of columns) {
        if (column.dataField === "IsChanged") {
            // Set the visibility of the "TagId" column to false
            column.visible = false;
      console.log("co val",column.value);
        }
      }
    }
    ngOnInit(){
      // this.dataGrid.instance.beginCustomLoading(''); // Pass an empty string as the loading message

      this.getCompareView();
    }

    refresh(){
      this.getCompareView();
    }
  
    getCompareView(): void {
      
      this.apiService.getCompareView().subscribe(
        (data: any) => {
          this.maindataSource = JSON.parse(data);
          console.log("datasource", this.maindataSource);
          // this.dataGrid.instance.endCustomLoading();
        },
        (error: any) => {
          console.error('Error fetching compare view tags:', error);
        }
      );
    }
  

    exportCV(e:any) {
      if (e.format === 'xlsx') {
          const workbook = new Workbook(); 
          const worksheet = workbook.addWorksheet("Main sheet"); 
          exportDataGrid({ 
              worksheet: worksheet, 
              component: e.component,
          }).then(function() {
              workbook.xlsx.writeBuffer().then(function(buffer:any) { 
                  saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Compare View.xlsx"); 
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
              doc.save('Compare View.pdf');
          });
      }
  }

}
