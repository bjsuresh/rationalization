  import { Component } from '@angular/core';  import { ImportChangeRequestComponent } from '../import-change-request/import-change-request.component';
  import { ApiService } from '../api.service';
  import { SharedService } from '../shared.service';
  import { Router } from '@angular/router';
  import { MatDialog } from '@angular/material/dialog';
  import * as saveAs from 'file-saver';
  import { exportDataGrid } from 'devextreme/excel_exporter';
  import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
  import { jsPDF } from 'jspdf'
  import { Workbook } from 'exceljs';
  import { DatePipe } from '@angular/common';
  
  
  @Component({
    selector: 'app-import-tags',
    templateUrl: './import-tags.component.html',
    styleUrls: ['./import-tags.component.css']
  })
  export class ImportTagsComponent {
    
    constructor(
      public dialog: MatDialog,
      private router: Router,
      private sharedService: SharedService,
      private apiService: ApiService,
      private datePipe: DatePipe,
      // private auditingService: AuditingService
    ) {
      // this.sharedService.setPageName('Tag Import');
    }
  
    taglist : any[] = [];
  
    ngOnInit(): void {
      this.getAllTags();
    }
    customizeColumns(columns: any) {
    
      console.log("co",columns);
      for (let column of columns) {
        if (column.dataField === "TagId") {
            // Set the visibility of the "TagId" column to false
            column.visible = false;
        }
      }
  
      const createdDateTimeIndex = columns.findIndex((column: { dataField: string; }) => column.dataField === "CreatedDateTime");
  
      // If "CreatedDateTime" column is found, remove it from the array and push it to the end
      if (createdDateTimeIndex !== -1) {
          const createdDateTimeColumn = columns.splice(createdDateTimeIndex, 1)[0];
          columns.push(createdDateTimeColumn);
      }
      console.log(columns);
    }
    
    
    getAllTags(): void {
      this.apiService.getAllTags().subscribe(
        (data: any) => {
          this.taglist = JSON.parse(data);
          this.taglist.forEach(tag => {
            tag.CreatedDateTime = this.datePipe.transform(tag.CreatedDateTime, 'dd-MMM-yyyy HH:mm:ss');
          });
          console.log("user_access", this.taglist);
        },
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      );
    }

    saveDataToLocalStorage() {
      console.log("dts",this.taglist);
      const dataToSave = JSON.stringify(this.taglist);
      localStorage.setItem('taglist', dataToSave);
    }
  
    addTag(event:any){
      console.log("efvt",event.data);
      this.saveDataToLocalStorage();
    }
    
    updateTag(event:any){
      console.log("efvt",event)
      const id = event.key;
      const updatedUser = event.newData;
      updatedUser['id'] = id;
      this.saveDataToLocalStorage();
  
      console.log("updatedUser",updatedUser);
    }
  
    deleteTag(event:any){
      console.log("efvt",event.data)
      const deletedId = event.data.id;
      this.taglist = this.taglist.filter(item => item.id !== deletedId);
      this.saveDataToLocalStorage();
    }
  
    isOpenPopup: boolean = false;
  
    addChangeRequest(){
      
      this.isOpenPopup = true;
      // const dialogRef = this.dialog.open(ImportTagsComponent);
  
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log(`Dialog result: ${result}`);
      //   this.getAllTags();
      // });
    }
  
    file: any;
    fileName: any;
  
    onFileChange(event: any): void {
      console.log("ev",event);
      const file: File = event.target.files[0];
  
      if (file) {
        // this.readFile(file);
        // this.uploadFile(file);
        this.file = file;
        this.fileName = file.name;
        // this.sharedService.readExcel(file)
        //   .then((data: any[]) => {
        //     console.log('Excel data:', data);
        //   })
        //   .catch((error) => {
        //     console.error('Error reading Excel file:', error);
        // });
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
            // Handle success
            // this.auditingService.getAuditInfo('Tag');
            // this.auditingService.getSubModule('Add');
    
            this.getAllTags();
            this.isOpenPopup = false;
  
          },
          (error: any) => {
            console.error('Error adding user:', error);
            // Handle error
            this.isOpenPopup = false;
  
          }
        );
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
  
    //   const reader: FileReader = new FileReader();
    //   reader.onload = (e: any) => {
    //     const binaryString: string = e.target.result;
    //     const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });
    //     const sheetName: string = workbook.SheetNames[0]; // Assuming only one sheet
    //     const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
    //     const data: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    //     // Assuming first row contains headers, so data[0] will contain headers
    //     // You can loop through data array to access each row
  
    //     // Example: Accessing data from first row
    //     const headers: string[] = data[0]; // Headers
    //     console.log('Headers:', headers);
    //     this.processModeColumns = headers;
    //     // Example: Accessing data from subsequent rows
    //     for (let i = 1; i < data.length; i++) {
    //       const rowData: any[] = data[i]; // Data of current row
    //       console.log('Row data:', rowData);
    //       // Perform actions with rowData, such as setting each column
    //     }
    //   };
    //   reader.readAsBinaryString(file);
    // }  