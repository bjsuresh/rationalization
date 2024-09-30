import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }


  tokenLogin(data: any) {
    let body = new URLSearchParams();
    body.set('UserName', data.UserName);
    body.set('Password', data.Password);
    body.set('grant_type', data.grant_type);
    return this.http.post(environment.apiUrl + 'token', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  }

  regenrateToken(refresh_token: any) {
    let body = new URLSearchParams();
    body.set('refresh_token', refresh_token);
    body.set('grant_type', 'refresh_token');
    return this.http.post(environment.apiUrl + 'token', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  }

  getUsers(){
    return this.http.get(environment.changeManagementUrl+'GetUsers');
  }

  getUser(username:any){
    return this.http.get(environment.apiUrl+'user?UserName='+username);
  }

  addUser(data:any) {
    // let postObj = new Object()
    return this.http.post(environment.apiUrl + 'AddUser', data)
  }

  deleteUser(userId: any) {
    let params = new HttpParams();
    const id = params.append('UserId', userId);
    return this.http.post(environment.apiUrl + 'DeleteUser?UserId='+userId, null);
  }

  updateUser(data:any) {
    console.log("data",data);
    // let postObj = new Object()
    return this.http.post(environment.apiUrl + 'UpdateUser', data)
  }

  //Access Levels
  getAccessLevels(){
    return this.http.get(environment.changeManagementUrl+'GetAccessLevel');
  }
  
  updateAccessLevels(updateData:any) {
    return this.http.post(environment.changeManagementUrl + 'UpdateAccessLevel', updateData)
  }

  //Tags Hierarchy
  getAllTags(){
    return this.http.get(environment.changeManagementUrl+'GetAllTags');
  }

  importTag(data:any){
    return this.http.post(environment.changeManagementUrl + 'ImportTags', data)
  }

  //Process Modes
  getProcessModes(){
    return this.http.get(environment.changeManagementUrl+'GetProcessModes');
  }

  addProcesMode(data:any) {
    return this.http.post(environment.changeManagementUrl + 'AddProcessMode', data)
  }

  deleteProcessMode(data: any) {
    // let params = new HttpParams();
    // const id = params.append('UserId', userId);
    return this.http.post(environment.changeManagementUrl + 'DeleteProcessMode',data);
  }

  updateProcesssMode(data:any) {
    console.log("data",data);
    return this.http.post(environment.changeManagementUrl + 'UpdateProcessMode', data)
  }

  //Unassigned Tags
    getUnassignedTags(){
      return this.http.get(environment.changeManagementUrl+'GetUnAssignedTags');
    }
    getAssignedTags(){
      return this.http.get(environment.changeManagementUrl+'GetAssignedTags');
    }
    addSingleDesignValue(data:any) {
      console.log("data",data);
      return this.http.post(environment.changeManagementUrl + 'AddSingleDesignValue', data)
    }
    importDesingValues(data:any){
      return this.http.post(environment.changeManagementUrl + 'ImportSingleDesignValue', data)
    }
    getWaitForApprovalTags() {
      return this.http.get(environment.changeManagementUrl + 'GetWaitForApprovalTags');
    }
    approveTag(data:any) {
      console.log("data",data);
      return this.http.post(environment.changeManagementUrl + 'ApproveSingleDesignValue', data)
    }
    disApproveTag(data:any){
      return this.http.post(environment.changeManagementUrl + 'DisApproveSingleDesignValue', data)
    }

    // OPCSettings
    getOPCSettings(){
      return this.http.get(environment.changeManagementUrl+'GetOPCSettings');
    }
    saveOPCSettings(data:any) {
      return this.http.post(environment.changeManagementUrl + 'SaveOPCSettings', data)
    }
    getOPCTagList(){
      return this.http.get(environment.changeManagementUrl+'GetOPCTagList');
    }
    getOPCServers(){
      return this.http.get(environment.changeManagementUrl+'GetOPCServers');
    }
    getOpcStatus(){
      return this.http.get(environment.changeManagementUrl+'GetOpcStatus');
    }
    
    getOPCBlockedParamList(){
      return this.http.get(environment.changeManagementUrl+'GetOPCBlockedParamList');
    }
    addOPCBlockedParam(data:any) {
      return this.http.post(environment.changeManagementUrl + 'AddOPCBlockedParam', data)
    }
    deleteOPCBlockedParam(data: any) {
      return this.http.post(environment.changeManagementUrl + 'DeleteOPCBlockedParam',data);
    }
  
    getAllowedOpcTags(){
      return this.http.get(environment.changeManagementUrl+'GetAllowedOpcTags');
    }
    addOpcTagtoAllowedList(data:any) {
      return this.http.post(environment.changeManagementUrl + 'AddOpcTagtoAllowedList', data)
    }
    deleteOPCTagFromAllowedList(data: any) {
      return this.http.post(environment.changeManagementUrl + 'DeleteOPCTagFromAllowedList',data);
    }
    
    getCompareView(){
      return this.http.post(environment.changeManagementUrl+'GetCompareView','');
    }
    getDiscrepency(){
      return this.http.post(environment.changeManagementUrl+'GetDiscrepency','');
    }
    getOPCView(){
      return this.http.post(environment.changeManagementUrl+'GetOPCView','');
    }
    

    getChangeRequestDetails(){
      return this.http.get(environment.changeManagementUrl+'GetChangeRequestDetails');
    }
    getChangeRequestDetailsDisApproved(){
      return this.http.get(environment.changeManagementUrl+'GetChangeRequestDetails_DisApproved');
    }
    getChangeRequestDetailsPending(){
      return this.http.get(environment.changeManagementUrl+'GetChangeRequestDetails_Pending');
    }
    getChangeRequestDetailsApproved(){
      return this.http.get(environment.changeManagementUrl+'GetChangeRequestDetails_Approved');
    }
    
    addNewChangeRequest(data:any) {
      return this.http.post(environment.changeManagementUrl + 'AddNewChangeRequest', data)
    }
    approveNewChangeRequest(data:any) {
      return this.http.post(environment.changeManagementUrl + 'ApproveNewChangeRequest', data)
    }
    disApproveNewChangeRequest(data:any) {
      return this.http.post(environment.changeManagementUrl + 'DisApproveNewChangeRequest', data)
    }
    
    getAuditModules(){
      return this.http.post(environment.changeManagementUrl+'GetAuditModules','');
    }
    getAuditSubModules(){
      return this.http.post(environment.changeManagementUrl+'GetAuditSubModules','');
    }
    getAuditLogs(data:any){
      return this.http.post(environment.changeManagementUrl+'GetAuditLogs',data);
    }
    addNewAudit(data:any) {
      return this.http.post(environment.changeManagementUrl + 'AddNewAudit', data)
    }

}
