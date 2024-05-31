import { Component, ViewChild } from '@angular/core';
import { ImportChangeRequestComponent } from '../import-change-request/import-change-request.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf'
import { DatePipe } from '@angular/common';
import { Workbook } from 'exceljs';


@Component({
  selector: 'app-requests-overview',
  templateUrl: './requests-overview.component.html',
  styleUrls: ['./requests-overview.component.css']
})
export class RequestsOverviewComponent {

  change_requests: any[] = [];
  pending_tags : any[] = [];
  app_tags : any[] = [];
  disapp_tags : any[] = [];

  isOpenPopup: boolean = false;
  isConfirmApproveModal: boolean = false;
  isConfirmDisApproveModal: boolean = false;
  isOpenViewModal: boolean = false;

  approveFormdata: any = {};
  disApproveFormdata: any = {};
  remarks= "";

  RequestGroup: FormGroup;
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private sharedService: SharedService,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
    // this.sharedService.setPageName('Requests Overview'); 
    this.RequestGroup = new FormGroup({
      nottification_no: new FormControl(''),
      plant: new FormControl('',Validators.required),
      processmode: new FormControl('',Validators.required),
      tagname: new FormControl('',Validators.required),
      tagdesc: new FormControl(''),
      alrmtype: new FormControl(''),
      currentval: new FormControl('',Validators.required),
      proposedvalue: new FormControl('',Validators.required),
      reason: new FormControl('',Validators.required),
      min_max_val: new FormControl('')


    });
  }

  tags = ["10FIC01","10FIc02"];
  parameters = ["PVHI","Low"];
  tagtypes:any[] = ["DCS","ESD","F&G","PLC","MCMS"];

  alrm_type:any[] = ["HH","H","L","LL","VL"];

  customizePTColumns(columns: any) {

    console.log("col",columns);
    for (let column of columns) {
      if (column.dataField === "DynamicDocName") {
          // Set the visibility of the "TagId" column to false
          column.visible = false;
      }
    }
  }
  customizeAppTColumns(columns: any) {

    console.log("col",columns);
    for (let column of columns) {
      if (column.dataField === "DynamicDocName") {
          // Set the visibility of the "TagId" column to false
          column.visible = false;
      }
    }
  }
  customizeDisAppTColumns(columns: any) {

    console.log("col",columns);
    for (let column of columns) {
      if (column.dataField === "DynamicDocName") {
          // Set the visibility of the "TagId" column to false
          column.visible = false;
      }
    }
  }
  customizeColumns(columns: any) {

    console.log("col",columns);
    for (let column of columns) {
      if (column.dataField === "DynamicDocName") {
          // Set the visibility of the "TagId" column to false
          column.visible = false;
      }
    }
    // columns.push({
    //   caption: 'Approve',
    //   calculateCellValue: (data: any) => 'approve',
    //   cellTemplate: 'approve', 
    // },
    // {
    //   caption: 'Dis Approve',
    //   calculateCellValue: (data: any) => 'disapprove', // Add your logic here
    //   cellTemplate: 'disapprove', // Create a template with the icon
    // },
    // {
    //   caption: 'View',
    //   calculateCellValue: (data: any) => 'view', // Add your logic here
    //   cellTemplate: 'view', // Create a template with the icon
    // }
    // );
    const approveColumn = {
      caption: 'Approve',
      calculateCellValue: (data: any) => data.Approved ? 'Approved' : '',
      cellTemplate: 'approve',
      visible: (rowData: any) => !rowData.Approved && !rowData.Disapproved
  };

  const disapproveColumn = {
      caption: 'Dis Approve',
      calculateCellValue: (data: any) => data.Disapproved ? 'Disapproved' : '',
      cellTemplate: 'disapprove',
      visible: (rowData: any) => !rowData.Approved && !rowData.Disapproved
  };

  const viewColumn = {
    caption: 'View',
    calculateCellValue: (data: any) =>'View',
    cellTemplate: 'view',
};

  columns.unshift(approveColumn, disapproveColumn, viewColumn);

  }

 

  // isCloneIconDisabled(e) {
    // return AppComponent.isChief(e.row.data.Position);
  // }
  // onCloneIconClick(e) {
    // const clonedItem = { ...e.row.data, ID: this.service.getMaxID() };

    // this.employees.splice(e.row.rowIndex, 0, clonedItem);
    // e.event.preventDefault();
  // }
  ProposedUser ="";
  ApprovedUser="";
  RequestDate ="";
  ApprovedDateTime="";

  onCellClick(e: any) {
    if (e.column && e.column.caption === 'Approve') {
      console.log('Approve Cell Clicked!', e.data);
      this.approveFormdata = e.data;
      this.isConfirmApproveModal = true;
    }

    if (e.column && e.column.caption === 'Dis Approve') {
      console.log('DisApprove Cell Clicked!', e.data);
      this.disApproveFormdata = e.data;
      this.isConfirmDisApproveModal = true;
    }

    if (e.column && e.column.caption === 'View') {
      console.log('View Cell Clicked!', e.data);
      this.isOpenViewModal = true;

      let formData = e.data;
      this.ProposedUser=formData.ProposedUser;
      this.ApprovedUser = formData.ApprovedUser;
      this.RequestDate = formData.RequestDate;
      this.ApprovedDateTime = formData.ApprovedDateTime;

      this.RequestGroup.patchValue({
        plant:formData.Plant,
        processmode: formData.ProcessModeName,
        tagname: formData.TagName,
        tagdesc: formData.TagDescription,
        alrmtype: formData.Parameter,
        currentval: formData.CurrentValue,
        proposedvalue: formData.ProposedValue,
        reason: formData.ProposeRemarks,
        min_max_val: formData.MaxValue
  
      });
    }
  }
  

  onTabChange(event: any) {
    if (event === 0) {
      this.getChangeRequestDetails();
    }
    if (event === 1) {
      this.getChangeRequestDetailsPending();
    }
    if (event === 2) {
      this.getChangeRequestDetailsApproved();
    }
    if (event === 3) {
      this.getChangeRequestDetailsDisApproved();
    }
  }

  ngOnInit(){
    this.getChangeRequestDetails();
    this.getForm();

    this.getAuditInfo();
  }

  getChangeRequestDetails(): void {
    
    this.apiService.getChangeRequestDetails().subscribe(
      (data: any) => {
        this.change_requests = JSON.parse(data);
        console.log("change_requests", this.change_requests);
      },
      (error: any) => {
        console.error('Error fetching get change_requests:', error);
      }
    );
  }

  getChangeRequestDetailsPending(): void {
    
    this.apiService.getChangeRequestDetailsPending().subscribe(
      (data: any) => {
        this.pending_tags = JSON.parse(data);
        this.pending_tags.forEach(tag => {
          tag.RequestDate = this.datePipe.transform(tag.RequestDate, 'dd-MMM-yyyy HH:mm:ss');
        });
        console.log("pending_tags", this.pending_tags);
      },
      (error: any) => {
        console.error('Error fetching get pending_tags:', error);
      }
    );
  }

  getChangeRequestDetailsApproved(): void {
    
    this.apiService.getChangeRequestDetailsApproved().subscribe(
      (data: any) => {
        this.app_tags = JSON.parse(data);
        
        this.app_tags.forEach(tag => {
          tag.ApprovedDateTime = this.datePipe.transform(tag.ApprovedDateTime, 'dd-MMM-yyyy HH:mm:ss');
          tag.RequestDate = this.datePipe.transform(tag.RequestDate, 'dd-MMM-yyyy HH:mm:ss');
        });
        console.log("Approved tags", this.app_tags);
      },
      (error: any) => {
        console.error('Error fetching get Approved tags:', error);
      }
    );
  }

  getChangeRequestDetailsDisApproved(): void {
    
    this.apiService.getChangeRequestDetailsDisApproved().subscribe(
      (data: any) => {
        this.disapp_tags = JSON.parse(data);
        console.log("Disapproved Tags", this.disapp_tags);
      },
      (error: any) => {
        console.error('Error fetching get Disapproved Tags:', error);
      }
    );
  }

  availiabletags: any[] = [];
  plants: any[] = [];
  processmodes: any[] = [];
  mainprocessmodes: any[] = [];
  tagnames: any[] = [];
  processModeId: any;
  designVal: any = {};
  tagdec:  any = {};
  params: any[] = [];

  compArr: any[] = [];

  getForm(){
    this.getAllTags();
    this.getCompareView();
    this.fetchProcessModes();
  }
  logs : any[] = [];
  AuditModuleId = "";
  SubAuditModuleId = "";
  subModuleName = "";

  getAuditInfo(){
    this.apiService.getAuditModules().subscribe(
      (data: any) => {
        this.logs = JSON.parse(data);
        let log = this.logs.find(tag=> tag.AuditModuleName == "ChangeRequest");
        console.log("log",log);
        this.AuditModuleId = log['AuditModuleId'];
      },
      (error: any) => {
        console.error('Error fetching AuditModuleId:', error);
      }
    );
  }
  getSubModule(subModule:any){
    let log;
    this.apiService.getAuditSubModules().subscribe(
      (data: any) => {
        this.logs = JSON.parse(data);
        
        switch (subModule) {
          case 'Add':
            log = this.logs.find(tag => tag.SubModuleName == "Add");
            this.SubAuditModuleId = log['SubModuleId'];
            break;
          case 'Edit':
            log = this.logs.find(tag => tag.SubModuleName == "Edit");
            this.SubAuditModuleId = log['SubModuleId'];
            break;
          case 'Approve':
            log = this.logs.find(tag => tag.SubModuleName == "Approve");
            this.SubAuditModuleId = log['SubModuleId'];
            break;
          case 'DisApprove':
            log = this.logs.find(tag => tag.SubModuleName == "DisApprove");
            this.SubAuditModuleId = log['SubModuleId'];
            break;
          case 'Enforce':
            log = this.logs.find(tag => tag.SubModuleName == "Enforce");
            this.SubAuditModuleId = log['SubModuleId'];
            break;
          case 'Remove':
            log = this.logs.find(tag => tag.SubModuleName == "Remove");
            this.SubAuditModuleId = log['SubModuleId'];
            break;
        }
        this.addAudit(subModule);

        // let log = this.logs.find(tag=> tag.SubModuleName == subModule);
        // console.log("log",log);
        // if(subModule === "Add"){
        //   this.addAudit();
        // }
        // else if(subModule === "Approve"){
        //   this.addAppAudit();
        // }
      },
      (error: any) => {
        console.error('Error fetching SubModuleId:', error);
      }
    );

  }
  addAppAudit(){
    let data = {
      "AuditModuleId" : this.AuditModuleId,
      "SubModuleId" : this.SubAuditModuleId,
      "Info" : "Approve",
      "Statement" : "Change request approved",
      "FullDetail" : "Change request approved"
    }
    this.apiService.addNewAudit(data).subscribe(
      (response: any) => {
        console.log('Audit added successfully:', response);
      },
      (error: any) => {
        console.error('Error adding audit:', error);
      }
    );

  }
  addAudit(action:any){
    let data = {
      "AuditModuleId" : this.AuditModuleId,
      "SubModuleId" : this.SubAuditModuleId,
      "Info" : action,
      "Statement" : "Change request added",
      "FullDetail" : "Change request added"
    }
    this.apiService.addNewAudit(data).subscribe(
      (response: any) => {
        console.log('Audit added successfully:', response);
      },
      (error: any) => {
        console.error('Error adding audit:', error);
      }
    );
  }

  onPlantValChanged(e:any){
    console.log("e",e);
    // let tags = this.availiabletags.find(mode => mode.Plant === e.value);
    // this.processModeId = onemode['ProcessModeId']
    // this.tagnames.push(tags.TagName)
    for (let index = 0; index < this.availiabletags.length; index++) {
      const element = this.availiabletags[index];
      console.log(element);

      this.tagnames.push(element['TagName']);
      const uniqueParams = new Set(this.tagnames);
      this.tagnames = Array.from(uniqueParams);

    } 

    console.log("tags:", this.tagnames);
  }

  onPMValChanged(e:any){
    console.log("e",e);
    const processmode = this.mainprocessmodes.find(mode => mode.ProcessModeName === e.value);
    this.processModeId = processmode['ProcessModeId']
    console.log("id:", processmode);
  }
  onTagValChanged(e:any){
    let tags = this.availiabletags.find(mode => mode.TagName === e.value);
    // this.processModeId = onemode['ProcessModeId']
    console.log("e",e,tags);
    this.apiService.getCompareView().subscribe(
      (data: any) => {
        this.compArr = JSON.parse(data);
        const abc_val = this.compArr.find(tag=> tag.TagName === e.value);
        this.tagdec = abc_val['TagDescription'];
        // console.log("availiabletag value",arr, this.designVal);

       
        for (let index = 0; index < this.compArr.length; index++) {
          const element = this.compArr[index];
          console.log(element);
    
          this.params.push(element['Parameter']);
          const uniqueParams = new Set(this.params);
          this.params = Array.from(uniqueParams);
    
        } 
      },
      (error: any) => {
        console.error('Error fetching availiabletags:', error);
      }
    );
    
  }

  onParamValChanged(e:any){
    const abc_val = this.compArr.find(tag=> tag.Parameter === e.value);
    this.designVal = abc_val['DesignValue'];
    this.RequestGroup.patchValue({
      currentval: this.designVal,
      tagdesc: this.tagdec
    });
  }
  
  getAllTags(): void {
    this.apiService.getAllTags().subscribe(
      (data: any) => {
        this.availiabletags = JSON.parse(data);
        this.plants = this.availiabletags.map(tag=> tag.Plant);
        const uniquePlants = new Set(this.plants);
        this.plants = Array.from(uniquePlants);

        console.log("availiabletags",this.plants, this.availiabletags);

      },
      (error: any) => {
        console.error('Error fetching availiabletags:', error);
      }
    );
  }
  fetchProcessModes(): void {
      this.apiService.getProcessModes().subscribe(
        (data: any) => {
          this.mainprocessmodes = JSON.parse(data);
           this.processmodes = this.mainprocessmodes.map(tag=> tag.ProcessModeName);
          console.log("processmodes", this.processmodes);
        },
        (error: any) => {
          console.error('Error fetching processmodes:', error);
        }
      );
    }
  getCompareView(): void {
    this.apiService.getCompareView().subscribe(
      (data: any) => {
        let arr :any[] = JSON.parse(data);
        // this.plants = arr.map(tag=> tag.Plant);
        console.log("availiabletag value",arr);

      },
      (error: any) => {
        console.error('Error fetching availiabletags:', error);
      }
    );
  }

  showAddChangeRequestTab: boolean = false;

  addNewChangeRequest() {
        if (this.RequestGroup.valid) {
          const formData = this.RequestGroup.value;

          const tagname = formData['tagname'];
          const ProcessModeId = this.processModeId;
      
            let newDatas = this.availiabletags.find(tag=> tag.TagName === tagname);
           
            console.log("new",this.availiabletags,newDatas);
      
            let data = {
              "ProcessModeId" : ProcessModeId,
              "Value" : formData['proposedvalue'],
              "CurrentValue" : this.designVal,
              "TagId": newDatas['TagId'],
              "Reason" : formData['reason']
            }
            this.apiService.addNewChangeRequest(data).subscribe(
              (response: any) => {
                console.log('New Change Request added successfully:', response);
                this.snackBar.open('New Change Request add Successfully','',{
                  duration: 1000
                });
                this.getChangeRequestDetails();
              },
              (error: any) => {
                console.error('Error adding New Change Request:', error);
                // Handle error
                this.snackBar.open('New Change Request add failed','',{
                  duration: 2000
                });
              }
            );
            let action = 'Add';
            this.getSubModule(action);
            this.tabGroup.selectedIndex = 0; 

          } else {
          this.markFormGroupTouched(this.RequestGroup);
        }
    }
  
    markFormGroupTouched(formGroup: FormGroup) {
      Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
  
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      });
    }
    // isApprove: boolean = true;
    isApprove(e:any) {
      console.log("e",e)
      return !e.row.data.Approved;
    }
    approveT(e:any){
      console.log("e",e.row.data)
      this.isConfirmApproveModal = true;
      // // this.approve();
      // console.log(this.approveFormdata);
      // const formData = this.approveFormdata;
      let data = {
        "DynamicDocId": e.row.data.DynamicDocId
      }
      this.apiService.approveNewChangeRequest(data).subscribe(
        (response: any) => {
          console.log('New Change Request approved successfully:', response);
          this.snackBar.open('New Change Request approved Successfully','',{
            duration: 4000
          });
          this.getChangeRequestDetails();
          this.isConfirmApproveModal = false;
          let action = 'Approve';
          this.getSubModule(action);
        },
        (error: any) => {
          console.error('Error approving New Change Request:', error);
          // Handle error
          this.snackBar.open('New Change Request approve failed','',{
            duration: 4000
          });
        }
      );
  
      console.log("approve btn",e.row.data);
      e.event.preventDefault();

    }
    disAppT(e:any){
    
      console.log("d",e);
    }
  viewDetails(e:any){
    
    console.log("d",e);
    // const dialogRef = this.dialog.open(ProposedTagsComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  importChangeRequest(){
    const dialogRef = this.dialog.open(ImportChangeRequestComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  addChangeRequest(){
    this.showAddChangeRequestTab = true;
    this.tabGroup.selectedIndex = 4; 

    // this.isOpenPopup = true;
    // const dialogRef = this.dialog.open(AddChangerequestComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  approve(){
    
    console.log(this.approveFormdata);
    const formData = this.approveFormdata;
    let data = {
      "DynamicDocId": formData['DynamicDocId']
    }
    this.apiService.approveNewChangeRequest(data).subscribe(
      (response: any) => {
        console.log('New Change Request approved successfully:', response);
        this.snackBar.open('New Change Request approved Successfully','',{
          duration: 4000
        });
        this.getChangeRequestDetails();
        this.isConfirmApproveModal = false;
      },
      (error: any) => {
        console.error('Error approving New Change Request:', error);
        // Handle error
        this.snackBar.open('New Change Request approve failed','',{
          duration: 4000
        });
      }
    );

  }
  disApprove(){
    console.log(this.disApproveFormdata);
    const formData = this.disApproveFormdata;
    let data = {
      "DynamicDocId" : formData['DynamicDocId'],
      "DisapprovedRemarks": this.remarks
    }
    this.apiService.disApproveNewChangeRequest(data).subscribe(
      (response: any) => {
        console.log('New Change Request disapproved successfully:', response);
        this.snackBar.open('New Change Request disapproved Successfully','',{
          duration: 4000
        });
        this.getChangeRequestDetails();
      this.isConfirmDisApproveModal = false;  
      },
      (error: any) => {
        console.error('Error when disapproving New Change Request:', error);
        // Handle error
        this.snackBar.open('New Change Request disapprove failed','',{
          duration: 4000
        });
      }
    );
  }

  closeModal(){
    this.isConfirmApproveModal = false;
  }
  exportCR(e:any) {
    if (e.format === 'xlsx') {
        const workbook = new Workbook(); 
        const worksheet = workbook.addWorksheet("Main sheet"); 
        exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
        }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer:any) { 
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Change Request.xlsx"); 
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
            doc.save('Change Request.pdf');
        });
    }
}

exportPendingRequest(e:any) {
  if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
      }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer:any) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Waiting Approval Requests.xlsx"); 
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
          doc.save('Waiting Approval Requests.pdf');
      });
  }
}

exportApproveReq(e:any) {
  if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
      }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer:any) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Approve requests.xlsx"); 
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
          doc.save('Approve requests.pdf');
      });
  }
}

exportDisApproveReq(e:any) {
  if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
      }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer:any) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Dis Approve requests.xlsx"); 
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
          doc.save('Dis Approve requests.pdf');
      });
  }
}

}
