import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf'
import { Workbook } from 'exceljs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-opc-configuration',
  templateUrl: './opc-configuration.component.html',
  styleUrls: ['./opc-configuration.component.css']
})
export class OpcConfigurationComponent {
  servers: any[] = [];
  popupVisible = false;
  isBrowseTags =false;

  settings:any[] = [];
  all_tag_list: any[] = [];
  block_param_list: any[] = [];

  server: any;
  status: any;
  OPCGrp!: FormGroup;
  tags:any[] = [];
  tag_list: any[] = [];
  param_list: any[] = [];
  isAlertModal: boolean = false;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
  ) {
    this.sharedService.setPageName('OPC Configuration'); 
    this.OPCGrp = new FormGroup({
      server: new FormControl(''),
      opc_time: new FormControl('')
    });
  } 

  showInfo() {
    this.popupVisible = true;
  }
  closeModal(){
    this.isAlertModal = false;
  }
  onTabChange(event: any) {
    if (event === 0) {
      this.getAllowedOpcTags();
    }
    if (event === 1) {
      this.getOPCBlockedParamList();
    }
  }
  ngOnInit(){
    this.getAllowedOpcTags();
    this.getOPCBlockedParamList();
    this.getOPCServers();
    this.getOPCTagList();
    this.fetchOPCSettings();
    this.getOpcStatus();
    this.getAllTags();
    this.getAuditInfo();
  }

  fetchOPCSettings(): void {
    this.apiService.getOPCSettings().subscribe(
      (data: any) => {
        const abc = JSON.parse(data);
        const settings = abc[0];

      this.OPCGrp.patchValue({
        server: settings.OPCServerName,
        opc_time: settings.OPCTIme
      });

      console.log("settings", settings);
      },
      (error: any) => {
        console.error('Error get settings:', error);
      }
    );
  }

  saveOPCSettings(): void {
    const formData = this.OPCGrp.value;
    console.log(formData);

    let data = {
        "OPCTIme" : formData['opc_time'],
        "OPCServerName" : formData['server']
    }

    console.log("new",data);
    this.apiService.saveOPCSettings(data).subscribe(
      (response: any) => {
        console.log('OPC Settings saved successfully:', response);
        this.snackBar.open('OPC Settings saved Successfully','',{
          duration: 1000
        });
        this.getAllowedOpcTags();

      },
      (error: any) => {
        console.error('Error adding OPC Settings:', error);
        // Handle error
        this.snackBar.open('OPC Settings add failed','',{
          duration: 1000
        });
      }
    );

  }

  getOPCTagList(): void {
    this.apiService.getOPCTagList().subscribe(
      (data: any) => {
        let Tags:any[] = JSON.parse(data);
        this.tag_list = Tags.map(tag=> tag.TgName);
        console.log("tag_list", this.tag_list);

        this.tag_list = this.tag_list.filter(tag => !this.all_tag_list.includes(tag.TgName));
        console.log("Filtered tag_list:", this.tag_list);

      // this.tag_list = this.tag_list.filter(tag => {
      //   return this.all_tag_list.some(tagName => tagName  === tag.TgName);
      // });

      },
      (error: any) => {
        console.error('Error get OPC tag list:', error);
      }
    );
  }
  getOPCServers(): void {
    this.apiService.getOPCServers().subscribe(
      (data: any) => {
        this.servers.push(data);
        console.log("settings",this.servers);
      },
      (error: any) => {
        console.error('Error get settings:', error);
      }
    );
  }
  getOpcStatus(): void {
    this.apiService.getOpcStatus().subscribe(
      (data: any) => {
        this.status = data;
        console.log("status", this.status);
      },
      (error: any) => {
        console.error('Error get status:', error);
      }
    );
  }

  getAllowedOpcTags(): void {
    this.apiService.getAllowedOpcTags().subscribe(
      (data: any) => {
        this.all_tag_list = JSON.parse(data);
        this.all_tag_list.forEach(tag => {
          tag.AllowedDateTime = this.datePipe.transform(tag.AllowedDateTime, 'dd-MMM-yyyy HH:mm:ss');
        });
        this.tags = this.all_tag_list.map(tag=> tag.Opctag);
        console.log("all_tag_list",this.tags, this.all_tag_list);

      },
      (error: any) => {
        console.error('Error get all_tag_list:', error);
      }
    );
  }
  availiabletags: any[]=[];
  getAllTags(): void {
    this.apiService.getAllTags().subscribe(
      (data: any) => {
        this.availiabletags = JSON.parse(data);
        this.param_list = this.availiabletags.map(tag=> tag.Parameter);
        const uniqueParams = new Set(this.param_list);

        this.param_list = Array.from(uniqueParams);
  
        console.log("availiabletags",this.param_list, this.availiabletags);

      },
      (error: any) => {
        console.error('Error fetching availiabletags:', error);
      }
    );
  }

  addAllowedOPCTag(event:any) {
    const tagname = event.data.TagName;
    console.log(event.data)
    // let newDatas = this.availiabletags.map(tag=> tag.Opctag === tagname);
     
    // console.log("new",tagname,this.availiabletags,newDatas);

    if(tagname != null){
      let newDatas = this.availiabletags.find(tag=> tag.Opctag === tagname);
     
      console.log("new",tagname,this.availiabletags,newDatas);
      if(newDatas === undefined){
        // this.snackBar.open('Please Import selected tag first','',{
        //   duration: 1200
        // });
    this.isAlertModal = true;

      }
      else{
        let data = {
          "TagId": newDatas['TagId']
        }
        this.apiService.addOpcTagtoAllowedList(data).subscribe(
          (response: any) => {
            console.log('Allowed OPC Tag added successfully:', response);
            this.snackBar.open('Allowed OPC Tag add Successfully','',{
              duration: 4000
            });
            this.getAllowedOpcTags();
            const info = "Allowed OPC Tag add";
            this.getSubModule('Add',info);
          },
          (error: any) => {
            console.error('Error adding Allowed OPC Tag:', error);
            // Handle error
            this.snackBar.open('Allowed OPC Tag add failed First Import selected Tag','',{
              duration: 4000
            });
          }
        );
  
      }
  
    }

  }
  
  deleteAllowedOPCTag(event: any) {
    const deletedId = event.key['OPCTagParamID'];
    const pm:any = {}
    pm['OPCTagParamID'] = deletedId
    console.log("pm",pm,deletedId);

    this.apiService.deleteOPCTagFromAllowedList(pm).subscribe(
      () => {
        console.log('AllowedOPCTag deleted successfully');
        this.snackBar.open('AllowedOPCTag deleted Successfully','',{
          duration: 4000
        });
        this.getAllowedOpcTags();
        const info = "Allowed OPC Tag delete";
        this.getSubModule('Remove',info);
      },
      (error: any) => {
        this.snackBar.open("Delete AllowedOPCTag failed",'',{
          duration: 4000
        });
        console.error('Error deleting AllowedOPCTag:', error);
        // Handle error
      }
    );
  }

  getOPCBlockedParamList(): void {
    this.apiService.getOPCBlockedParamList().subscribe(
      (data: any) => {
        this.block_param_list = JSON.parse(data);
        this.block_param_list.forEach(tag => {
          tag.BlockedDateTime = this.datePipe.transform(tag.BlockedDateTime, 'dd-MMM-yyyy HH:mm:ss');
        });
        console.log("block_param_list", this.block_param_list);
      },
      (error: any) => {
        console.error('Error get block_param_list:', error);
      }
    );
  }

  addOPCBlockedParam(event:any) {
    const param = event.data.OPCParameter;

    let data =
      {
        "OPCParameter" : param
    }
    this.apiService.addOPCBlockedParam(data).subscribe(
      (response: any) => {
        console.log('OPCBlockedParam added successfully:', response);
        this.snackBar.open('OPCBlockedParam add Successfully','',{
          duration: 4000
        });
        this.getOPCBlockedParamList();
        const info = "OPCBlockedParam Tag add";
        this.getSubModule('Add',info);
      },
      (error: any) => {
        console.error('Error adding OPCBlockedParam:', error);
        // Handle error
        this.snackBar.open('OPCBlockedParam add failed','',{
          duration: 4000
        });
      }
    );
  }
  
  deleteOPCBlockedParam(event: any) {
    console.log("e",event);
    const deletedId = event.key['OPCParamterID'];
    const pm:any = {}
    pm['OPCParamterID'] = deletedId
    console.log("pm",pm,deletedId);

    this.apiService.deleteOPCBlockedParam(pm).subscribe(
      () => {
        console.log('OPCBlockedParam deleted successfully');
        this.snackBar.open('OPCBlockedParam deleted Successfully','',{
          duration: 4000
        });
        this.getOPCBlockedParamList();
        const info = "OPCBlockedParam Tag add";
        this.getSubModule('Remove',info);
      },
      (error: any) => {
        this.snackBar.open("Delete OPCBlockedParam failed",'',{
          duration: 4000
        });
        console.error('Error deleting OPCBlockedParam:', error);
        // Handle error
      }
    );
  }

  logs: any[] = [];
  AuditModuleId = "";
  SubAuditModuleId = "";


  getAuditInfo(): void {
    this.apiService.getAuditModules().subscribe(
      (data: any) => {
        this.logs = JSON.parse(data);
        let log = this.logs.find(tag => tag.AuditModuleName == "OPC");
        console.log("log", log);
        this.AuditModuleId = log['AuditModuleId'];
      },
      (error: any) => {
        console.error('Error fetching AuditModuleId:', error);
      }
    );
  }

  getSubModule(subModule: string,info): void {
    this.apiService.getAuditSubModules().subscribe(
      (data: any) => {
        this.logs = JSON.parse(data);
        let log;
        switch (subModule) {
          case 'Add':
          case 'Edit':
          case 'Approve':
          case 'DisApprove':
          case 'Enforce':
          case 'Remove':
            log = this.logs.find(tag => tag.SubModuleName == subModule);
            this.SubAuditModuleId = log['SubModuleId'];
            console.log("subAuditId",this.SubAuditModuleId)
            break;
          default:
            console.error('Invalid subModule:', subModule);
            return;
        }
        this.addAudit(subModule,info);
      },
      (error: any) => {
        console.error('Error fetching SubModuleId:', error);
      }
    );
  }

  addAudit(action: string,info): void {
    let data = {
      "AuditModuleId": this.AuditModuleId,
      "SubModuleId": this.SubAuditModuleId,
      "Info": action,
      "Statement":  info.toLowerCase() + "ed",
      "FullDetail": info.toLowerCase() + "ed" 
    }
    console.log("data", data);
    this.apiService.addNewAudit(data).subscribe(
      (response: any) => {
        console.log('Audit added successfully:', response);
      },
      (error: any) => {
        console.error('Error in audit:', error);
      }
    );
  }


  exportAllTagList(e:any) {
    if (e.format === 'xlsx') {
        const workbook = new Workbook(); 
        const worksheet = workbook.addWorksheet("Main sheet"); 
        exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
        }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer:any) { 
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Allowed Tag List.xlsx"); 
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
            doc.save('Allowed Tag List.pdf');
        });
    }
}
exportBlockParamList(e:any) {
  if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      exportDataGrid({ 
          worksheet: worksheet, 
          component: e.component,
      }).then(function() {
          workbook.xlsx.writeBuffer().then(function(buffer:any) { 
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Blocked Param List.xlsx"); 
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
          doc.save('Blocked Param List.pdf');
      });
  }
}


}
