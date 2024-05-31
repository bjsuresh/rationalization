  import { Component, ViewChild } from '@angular/core';
  import { DxDataGridComponent } from 'devextreme-angular';
  import { SharedService } from '../shared.service';
  import { ApiService } from '../api.service';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { DatePipe, Location } from '@angular/common';
  
  @Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
  })
  export class UsersComponent {
    
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid:any= DxDataGridComponent;
    passwordCellTemplate: any;
  
    constructor(
      private sharedService: SharedService,
      private apiService: ApiService,
      private snackBar: MatSnackBar,
      private location: Location,
      private datePipe: DatePipe
    ) {
      this.sharedService.setPageName('User Management'); 
      this.passwordCellTemplate = (container: any, options: any) => {
        container.innerHTML = this.isEditing ? '<input type="password" [(ngModel)]="options.data.UserPass" />' : '******';
      };
  
    }
    users:any[] = [];
  
    user_access: any[]= [];
    isEditing: boolean = false;
  
    onTabChange(event: any) {
      if (event === 0) {
        this.fetchUsers();
      }
      if (event === 1) {
        this.fetchLevels();
      }
    }
  
    selectLevel(data:any) {
      if (data.value == 'all') {
        this.dataGrid.instance.clearFilter();
      } else {
        this.dataGrid.instance.filter(['level', '=', data.value]);
      }
    }
  
    selectUser(data:any){
      if (data.value == 'all') {
        this.dataGrid.instance.clearFilter();
      } else {
        this.dataGrid.instance.filter(['username', '=', data.value]);
      }
    }
  
  
    ngOnInit(): void {
      this.getUM();
    }
  
    getUM(){
      this.fetchUsers();
      this.fetchLevels();
    }
  
    fetchLevels(): void {
      this.apiService.getAccessLevels().subscribe(
        (data: any) => {
          this.user_access = JSON.parse(data);
          console.log("user_access", this.user_access);
        },
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      );
    }
  
    updateLevels(event:any){
      // const updatedData = event.key;
      // let id = updatedData['UserId'];
      // let approver = updatedData['Approver'];
      // let enforcer =updatedData['Enforcer'];
      // let proposer = updatedData['Proposer'];
      // const data = {
      //   UserId: id,
      //   Approver: approver,
      //   Enforcer: enforcer,
      //   Proposer: proposer
      // }
      const id = event.key['UserId'];
      const updatedData = event.newData;
      updatedData['UserId'] = id;
  
      console.log("updatedUser",updatedData);
      
      this.apiService.updateAccessLevels(updatedData).subscribe(
        (response: any) => {
          console.log('AccessLevels updated successfully:', response);  
        },
        (error: any) => {
          console.error('Error updating user:', error);
          // Handle error
        }
      );
    }
  
    fetchUsers(): void {
      this.apiService.getUsers().subscribe(
        (data: any) => {
          this.users = JSON.parse(data);
          this.users.forEach(user => {
            user.CreatedDate = this.datePipe.transform(user.CreatedDate, 'dd-MMM-yyyy HH:mm:ss');
          });
          console.log("users", this.users);
        },
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      );
    }
    onInitNewRow(event: any) {
      console.log("ev",event.data)
      event.data.active = true;
  
      // const currentDate = new Date();
  
      // const formattedDate = this.formatDate(currentDate);
  
      // event.data.createdTime = formattedDate;
  }
    addUser(event:any) {
      const newUser = event.data;
      console.log("new",newUser);
      this.apiService.addUser(newUser).subscribe(
        (response: any) => {
          console.log('User added successfully:', response);
          this.snackBar.open('User added Successfully','',{
            duration: 4000
          });
          this.fetchUsers();
        },
        (error: any) => {
          console.error('Error adding user:', error);
          this.snackBar.open('User add Failed','',{
            duration: 4000
          });
        }
      );
    }
    
    updateUser(event:any) {
      const id = event.key['UserId'];
      const updatedUser = event.newData;
      updatedUser['UserId'] = id;
  
      console.log("updatedUser",updatedUser);
      // const data = {
      //   UserId: id,
      //   UserName: name,
      //   UserPass: pass,
      //   Admin: admin,
      //   Active: active
      // }
  
      this.apiService.updateUser(updatedUser).subscribe(
        (response: any) => {
          console.log('User updated successfully:', response);
          this.fetchUsers();
          this.snackBar.open('User updated Successfully','',{
            duration: 4000
          });
        },
        (error: any) => {
          console.error('Error updating user:', error);
          this.snackBar.open('User update Failed','',{
            duration: 4000
          });
        }
      );
    }
  
    
    deleteUser(event: any) {
      const deletedUserId = event.key.UserId;
      console.log("deletedUserId",event,deletedUserId);
  
      this.apiService.deleteUser(deletedUserId).subscribe(
        () => {
          console.log('User deleted successfully');
          this.snackBar.open('User deleted Successfully','',{
            duration: 4000
          });
          this.fetchUsers();
        },
        (error: any) => {
          this.snackBar.open("delete user failed",'',{
            duration: 4000
          });
          console.error('Error deleting user:', error);
          // Handle error
        }
      );
    }
  
    refreshPage() {
      // this.location.reload();
      window.location.reload();
    }
  
    logs : any[] = [];
    AuditModuleId = "";
    SubAuditModuleId = "";
  
    getAuditInfo(page){
      this.apiService.getAuditModules().subscribe(
        (data: any) => {
          this.logs = JSON.parse(data);
          let log = this.logs.find(tag=> tag.AuditModuleName == page);
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
  
        },
        (error: any) => {
          console.error('Error fetching SubModuleId:', error);
        }
      );
  
    }
    addAudit(action:any){
      let data = {
        "AuditModuleId" : this.AuditModuleId,
        "SubModuleId" : this.SubAuditModuleId,
        "Info" : action,
        "Statement" : "User " + action.toLowerCase() + "ed",
        "FullDetail" : "User " + action.toLowerCase() + "ed"
      } 
      console.log("data",data);
      this.apiService.addNewAudit(data).subscribe(
        (response: any) => {
          console.log('Audit added successfully:', response);
        },
        (error: any) => {
          console.error('Error in audit:', error);
        }
      );
    }
  
  }
