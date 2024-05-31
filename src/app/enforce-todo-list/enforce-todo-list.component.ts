import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../shared.service';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-enforce-todo-list',
  templateUrl: './enforce-todo-list.component.html',
  styleUrls: ['./enforce-todo-list.component.css']
})
export class EnforceTodoListComponent {
  dataSource : any[] = [
    {
      id:1,
      TagId:101,
      TagName: "10FIC11",
      Parameter: "PVHI",
      New_Value: "65",
      Requested_Time: "27/03/2024 12:30 P.M",
      Requestor: "admin",
      OPCServer: "SAMA DA Server"
    },
    {
      id:2,
      TagId:102,
      TagName: "10FIC13",
      Parameter: "PVHI",
      New_Value: "71",
      Requested_Time: "27/03/2024 01:30 P.M",
      Requestor: "admin",
      OPCServer: "SAMA DA Server"
    },
    {
      id:3,
      TagId:103,
      TagName: "10FIC15",
      Parameter: "PVHI",
      New_Value: "80",
      Requested_Time: "27/03/2024 02:20 P.M",
      Requestor: "admin",
      OPCServer: "SAMA DA Server"
    }
  ];

  tagsList : any[] = [];
  constructor(
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private apiService: ApiService
  ) { 
    // localStorage.setItem('enfTodoList', JSON.stringify(this.dataSource));
  }
    
  ngOnInit() {

    const storedData = localStorage.getItem('enfTodoList');
   
    // Check if the data exists in localStorage
    if (storedData) {
      // Parse the JSON string to get the array data
      this.dataSource = JSON.parse(storedData);
    }
    let arr = localStorage.getItem("TagsList");
    if(arr){
      const array = JSON.parse(arr);
      this.tagsList= array.map(arr => arr.tagname);
      console.log("tagsList",this.tagsList)
    }
  // ngOnInit(): void {
    // this.sharedService.readExcelFromAsset()
    //   .then((data: any[]) => {
    //     console.log('Excel data:', data);
    //     // Process the Excel data as needed
    //     const headers = data[0];
  
    //     // Remove the header row and convert the rest of the rows to objects
    //      this.dataSource1 = data.slice(1).map((row, index) => {
    //       const obj: any = { id: index + 1 };
        
    //       headers.forEach((header: string, colIndex: string | number) => {
    //         obj[header.toLowerCase()] = row[colIndex];
    //       });
        
    //       return obj;
    //     });
        
    //     console.log('Transformed Data:', this.dataSource1);
      
    //   })
    //   .catch((error) => {
    //     console.error('Error reading Excel file:', error);
    //   });

    // this.sharedService.setPageName('Rationalization'); // Set the appropriate page name
    // this.cdr.detectChanges();

    //this.apiService.EnforceTodoList().subscribe({next:(res:any) => {
    //  this.dataSource= JSON.parse(res)
    //  console.log(this.dataSource)
    //  }  
    //  });

  }
  
  addFun(event:any){
    console.log("efvt",event.data);
    this.saveDataToLocalStorage();
  }
  deleteFun(event:any){
    console.log("efvt",event.data)
    const deletedId = event.data.TagId;
    this.dataSource = this.dataSource.filter(item => item.TagId !== deletedId);
    this.saveDataToLocalStorage();
  }

  saveDataToLocalStorage() {
    const dataToSave = JSON.stringify(this.dataSource);
    localStorage.setItem('enfTodoList', dataToSave);
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
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "EnforceTodoList.xlsx"); 
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
          doc.save('EnforceTodoList.pdf');
      });
  }

  }

}
