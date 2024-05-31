import { Component, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDesignvalComponent } from '../add-designval/add-designval.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DxDataGridComponent } from 'devextreme-angular';
import { FormControl, FormGroup } from '@angular/forms';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf'
import { Workbook } from 'exceljs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-design-view',
  templateUrl: './design-view.component.html',
  styleUrls: ['./design-view.component.css']
})
export class DesignViewComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private sharedService: SharedService,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    // private auditingService: AuditingService
  ) {
    // this.sharedService.setPageName('Design View'); 
      this.FormGroup = new FormGroup({
        procesmodename: new FormControl(''),
        tagname: new FormControl(''),
        paramter: new FormControl(''),
        designVal: new FormControl(''),
    })
  }

  unassigned_tags : any[] = [];
  assignedTags : any[] = [];
  approvals: any[] = [];
  processmodes: any[] = [];
      
  isOpenAddDesign: boolean = false;
  
  openPopup() {
      this.isOpenAddDesign = true;
  }

  closePopup() {
      this.isOpenAddDesign = false;
  }
  cancel(){
    this.isOpenAddDesign = false;
    this.isOpenPopup = false;
  }

  isOpenPopup: boolean = false;

  addChangeRequest(){
    this.isOpenPopup = true;
    // const dialogRef = this.dialog.open(ImportTagsComponent)
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    //   this.getAllTags();
    // });
  }

  file: any;
  fileName: any;

  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // this.uploadFile(file);
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
  
      this.apiService.importDesingValues(formData).subscribe(
        (response: any) => {
          console.log('File uploaded successfully:', response);
          // Handle success
          this.isOpenPopup = false;
          this.snackBar.open('Design Value imported Successfully','',{
            duration: 1000
          });
        },
        (error: any) => {
          console.error('Error adding user:', error);
          // Handle error
        }
      );
    }


  addDesignValue(){
    this.isOpenAddDesign = true;
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

  onTabChange(event: any) {
    if (event === 0) {
      this.fetchUnAssignedTags();
    }
    if (event === 1) {
      this.fetchApprovalTags();
    }
    if (event === 2) {
      this.fetchAssignedTags();
    }
    if (event === 3) {
      this.fetchProcessModes();
    }
  }

  
  customizeWaitAppColumns(columns: any){
    for (let column of columns) {
      if (column.dataField === "TagId") {
          // Set the visibility of the "TagId" column to false
          column.visible = false;
      }
      if (column.dataField === "DynamicDocTranId") {
        // Set the visibility of the "TagId" column to false
        column.visible = false;
    }
    if (column.dataField === "DynamicDocId") {
      // Set the visibility of the "TagId" column to false
      column.visible = false;
  }
    }
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

  ngOnInit(){
    this.fetchUnAssignedTags();
  }

  fetchApprovalTags(): void {
    
    this.apiService.getWaitForApprovalTags().subscribe(
      (data: any) => {
        this.approvals = JSON.parse(data);
        this.approvals.forEach(tag => {
          tag.CreatedDateTime = this.datePipe.transform(tag.CreatedDateTime, 'dd-MMM-yyyy HH:mm:ss');
        });
        console.log("approvals", this.approvals);
      },
      (error: any) => {
        console.error('Error fetching approvals tags:', error);
      }
    );
  }

  pm: any[] = []; // declare pm as an array
  processModeNames: string[] = []; 
  TagNames: any[] = [];
  parameters: string[] = [];
  processModeId: any;
  tagId: any;
  
  fetchAssignedTags(): void {
    
    this.apiService.getAssignedTags().subscribe(
      (data: any) => {
        this.assignedTags = JSON.parse(data);
        this.assignedTags.forEach(tag => {
          tag.CreatedDateTime = this.datePipe.transform(tag.CreatedDateTime, 'dd-MMM-yyyy HH:mm:ss');
        });
        console.log("unassigned_tags", this.assignedTags);
      },
      (error: any) => {
        console.error('Error fetching Unassigned tags:', error);
      }
    );
  }

  fetchUnAssignedTags(): void {
    
    this.apiService.getUnassignedTags().subscribe(
      (data: any) => {
        this.unassigned_tags = JSON.parse(data);
        this.unassigned_tags.forEach(tag => {
          tag.CreatedDateTime = this.datePipe.transform(tag.CreatedDateTime, 'dd-MMM-yyyy HH:mm:ss');
        });
        console.log("unassigned_tags", this.unassigned_tags);
        this.TagNames = this.unassigned_tags.map(mode => mode.TagName);

        const uniqueTagNamesSet = new Set(this.TagNames);

        this.TagNames = Array.from(uniqueTagNamesSet);

        console.log("TagNames:", this.TagNames);    
      },
      (error: any) => {
        console.error('Error fetching Unassigned tags:', error);
      }
    );

    this.apiService.getProcessModes().subscribe(
      (data: any) => {
        this.pm = JSON.parse(data);
        this.processModeNames = this.pm.map(mode => mode.ProcessModeName);
        console.log("ProcessModeNames:", this.processModeNames);
      },
      (error: any) => {
        console.error('Error fetching processmodes:', error);
      }
    );
  }

  onPMValueChanged(e:any){
    console.log("e",e);
    let onemode = this.pm.find(mode => mode.ProcessModeName === e.value);
    this.processModeId = onemode['ProcessModeId']
    console.log("id:", this.pm,this.processModeId);
  }

  onTagValueChanged(e:any){
    console.log("e",e);
    let array: any[] = [];
    let pms;
    pms = this.unassigned_tags.find(tag => tag.TagName === e.value);
    // console.log("element",array.push(pms));

    for (let index = 0; index < this.unassigned_tags.length; index++) {
      const element = this.unassigned_tags[index];
    console.log(element);

      this.parameters.push(element['Parameter']);
      const uniqueParams = new Set(this.parameters);

      this.parameters = Array.from(uniqueParams);

    } 
    // this.parameters.push(pms['Parameter']);
    this.tagId = pms['TagId'];

    if (this.parameters) {
      console.log("Selected Tag Parameter:", this.parameters);
    }  
  }

  submit(){
    const formData = this.FormGroup.value;
    console.log(formData);

    let data = {
      "ProcessModeId" : this.processModeId,
      "Value" : formData['designVal'],
      "TagId" : this.tagId
    }

    console.log("data",data);

    this.apiService.addSingleDesignValue(data).subscribe(
      (response: any) => {
        console.log('Design Val added successfully:', response);
        this.snackBar.open('Design Val add Successfully','',{
          duration: 1000
        });
        this.fetchUnAssignedTags();
        // this.auditingService.getAuditInfo('DesignValue');
        // this.auditingService.getSubModule('Add');

        this.isOpenAddDesign = false;
      },
      (error: any) => {
        console.error('Error adding design val:', error);
        // Handle error
        this.snackBar.open('Design Val add failed','',{
          duration: 1000
        });
      }
    );

  }

  fetchProcessModes(): void {
    this.apiService.getProcessModes().subscribe(
      (data: any) => {
        this.processmodes = JSON.parse(data);
        console.log("processmodes", this.processmodes);
      },
      (error: any) => {
        console.error('Error fetching processmodes:', error);
      }
    );
  }

  @ViewChild('dataGridRef', { static: false }) dataGrid!: DxDataGridComponent;

  selectedRowsData: any[] = [];
  FormGroup!: FormGroup;
 
  approveTag(){
    this.selectedRowsData = this.dataGrid.instance.getSelectedRowsData();
    console.log("selectedRowsData",this.selectedRowsData);
   
    for (let index = 0; index < this.selectedRowsData.length; index++) {
      let array: any[]= [];
      const element = this.selectedRowsData[index];
      array.push(element);
      const id = array.find((mode: { DynamicDocTranId: any; }) => mode.DynamicDocTranId);
      const dynamnicDocId = id['DynamicDocTranId'];
      console.log("element",array,dynamnicDocId);
      
      let data = {
        "DynamicDocTranId" : dynamnicDocId
      }
      console.log("data",data);
      this.apiService.approveTag(data).subscribe(
        (response: any) => {
          console.log('Tags Approved:', response);
          this.snackBar.open('Tags Approved','',{
            duration: 1000
          });
          this.fetchApprovalTags();
          // this.auditingService.getAuditInfo('DesignValue');
          // this.auditingService.getSubModule('Approve');  
        },
        (error: any) => {
          console.error('Error when approve tags:', error);
          // Handle error
          this.snackBar.open('Tags approve failed','',{
            duration: 1000
          });
        }
      );
    }

  }
  isDisapproveReasonModal: boolean = false;
  remarks = ""

  openDisAppModal(){
    this.isDisapproveReasonModal = true;
  }
  closeDisAproveMOdal(){
    this.isDisapproveReasonModal = false;
  }

  disApproveTag(){
    this.selectedRowsData = this.dataGrid.instance.getSelectedRowsData();
   
    for (let index = 0; index < this.selectedRowsData.length; index++) {
      let array: any[]= [];
      const element = this.selectedRowsData[index];
      array.push(element);
      const id = array.find((mode: { DynamicDocTranId: any; }) => mode.DynamicDocTranId);
      const dynamnicDocId = id['DynamicDocTranId'];
      console.log("element",array,dynamnicDocId);
      
      let data = {
        "DynamicDocTranId" : dynamnicDocId,
        "DisapprovedRemarks": this.remarks
      }
      console.log("data",data);
      this.apiService.disApproveTag(data).subscribe(
        (response: any) => {
          console.log('Tags Approved:', response);
          this.snackBar.open('Tags Approved','',{
            duration: 1000
          });
          this.fetchApprovalTags();
          // this.auditingService.getAuditInfo('DesignValue');
          // this.auditingService.getSubModule('DisApprove');  

          this.isDisapproveReasonModal = false;
        },
        (error: any) => {
          console.error('Error when approve tags:', error);
          // Handle error
          this.snackBar.open('Tags approve failed','',{
            duration: 1000
          });
        }
      );
    }

    
  }

  addPM(event:any) {
    const newDatas = event.data;
    console.log("new",newDatas);
    this.apiService.addProcesMode(newDatas).subscribe(
      (response: any) => {
        console.log('Process Mode added successfully:', response);
        this.snackBar.open('Process Mode add Successfully','',{
          duration: 1000
        });
        this.fetchProcessModes();
      },
      (error: any) => {
        console.error('Error adding user:', error);
        // Handle error
        this.snackBar.open('Process Mode add failed','',{
          duration: 1000
        });
      }
    );
  }
  
  updatePM(event:any) {
    console.log(event);
    const id = event.key['ProcessModeId'];
    const updateddata = event.newData;
    updateddata['ProcessModeId'] = id;
    
    console.log("updatedt",updateddata);

    this.apiService.updateProcesssMode(updateddata).subscribe(
      (response: any) => {
        console.log('Process Mode updated successfully:', response);
        // Handle success
        this.fetchProcessModes();
        this.snackBar.open('Process Mode updated Successfully','',{
          duration: 1000
        });
      },
      (error: any) => {
        console.error('Error updating Process Mode:', error);
        // Handle error
        this.fetchProcessModes();
      }
    );
  }

  
  deletePM(event: any) {
    const deletedId = event.key['ProcessModeId'];
    const pm:any = {}
    pm['ProcessModeId'] = deletedId
    console.log("pm",pm,deletedId);

    this.apiService.deleteProcessMode(pm).subscribe(
      () => {
        console.log('Process Mode deleted successfully');
        this.snackBar.open('Process Mode deleted Successfully','',{
          duration: 1000
        });
        this.fetchProcessModes();
      },
      (error: any) => {
        this.snackBar.open("Delete Process Mode failed",'',{
          duration: 1000
        });
        console.error('Error deleting Process Mode:', error);
        // Handle error
      }
    );
  }

  exportGridUnsignTags(e:any) {
    if (e.format === 'xlsx') {
        const workbook = new Workbook(); 
        const worksheet = workbook.addWorksheet("Main sheet"); 
        exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
        }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer:any) { 
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Un Assigned Tags.xlsx"); 
            }); 
        }); 
    } 
    else if (e.format === 'pdf') {
      var autoTableOptions = {
        styles: { overflow: 'linebreak' },
        columnStyles: { // Set column width to full size
          '*': { // Set all columns to full size
              columnWidth: 'auto'
          }
      }
    };
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
            doc.save('Un Assigned Tags.pdf');
        });
    }
}

exportGridAssignTags(e:any) {
  if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
      }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer:any) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Assigned Tags.xlsx"); 
          }); 
      }); 
  } 
  else if (e.format === 'pdf') {
    var autoTableOptions = {
      styles: { overflow: 'linebreak' },
      columnStyles: { // Set column width to full size
        '*': { // Set all columns to full size
            columnWidth: 'auto'
        }
    }
  };
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
          doc.save('Assigned Tags.pdf');
      });
  }
}

exportPendingTags(e:any) {
  if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
      }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer:any) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Waiting Approval Tags.xlsx"); 
          }); 
      }); 
  } 
  else if (e.format === 'pdf') {
    var autoTableOptions = {
      styles: { overflow: 'linebreak' },
      columnStyles: { // Set column width to full size
        '*': { // Set all columns to full size
            columnWidth: 'auto'
        }
    }
  };
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
          doc.save('Waiting Approval.pdf');
      });
  }
}

exportPM(e:any) {
  if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
      }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer:any) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Process Modes.xlsx"); 
          }); 
      }); 
  } 
  else if (e.format === 'pdf') {
    var autoTableOptions = {
      styles: { overflow: 'linebreak' },
      columnStyles: { // Set column width to full size
        '*': { // Set all columns to full size
            columnWidth: 'auto'
        }
    }
  };
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
          doc.save('Process Modes.pdf');
      });
  }
}
}
