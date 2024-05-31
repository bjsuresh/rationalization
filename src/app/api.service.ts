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
    return this.http.get(environment.apiUrl+'GetUsers');
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
    return this.http.get(environment.apiUrl+'GetAccessLevel');
  }
  
  updateAccessLevels(updateData:any) {
    return this.http.post(environment.apiUrl + 'UpdateAccessLevel', updateData)
  }

  //Tags Hierarchy
  getAllTags(){
    return this.http.get(environment.apiUrl+'GetAllTags');
  }

  importTag(data:any){
    return this.http.post(environment.apiUrl + 'ImportTags', data)
  }

  //Process Modes
  getProcessModes(){
    return this.http.get(environment.apiUrl+'GetProcessModes');
  }

  addProcesMode(data:any) {
    return this.http.post(environment.apiUrl + 'AddProcessMode', data)
  }

  deleteProcessMode(data: any) {
    // let params = new HttpParams();
    // const id = params.append('UserId', userId);
    return this.http.post(environment.apiUrl + 'DeleteProcessMode',data);
  }

  updateProcesssMode(data:any) {
    console.log("data",data);
    return this.http.post(environment.apiUrl + 'UpdateProcessMode', data)
  }

  //Unassigned Tags
    getUnassignedTags(){
      return this.http.get(environment.apiUrl+'GetUnAssignedTags');
    }
    getAssignedTags(){
      return this.http.get(environment.apiUrl+'GetAssignedTags');
    }
    addSingleDesignValue(data:any) {
      console.log("data",data);
      return this.http.post(environment.apiUrl + 'AddSingleDesignValue', data)
    }
    importDesingValues(data:any){
      return this.http.post(environment.apiUrl + 'ImportSingleDesignValue', data)
    }
    getWaitForApprovalTags() {
      return this.http.get(environment.apiUrl + 'GetWaitForApprovalTags');
    }
    approveTag(data:any) {
      console.log("data",data);
      return this.http.post(environment.apiUrl + 'ApproveSingleDesignValue', data)
    }
    disApproveTag(data:any){
      return this.http.post(environment.apiUrl + 'DisApproveSingleDesignValue', data)
    }

    // OPCSettings
    getOPCSettings(){
      return this.http.get(environment.apiUrl+'GetOPCSettings');
    }
    saveOPCSettings(data:any) {
      return this.http.post(environment.apiUrl + 'SaveOPCSettings', data)
    }
    getOPCTagList(){
      return this.http.get(environment.apiUrl+'GetOPCTagList');
    }
    getOPCServers(){
      return this.http.get(environment.apiUrl+'GetOPCServers');
    }
    getOpcStatus(){
      return this.http.get(environment.apiUrl+'GetOpcStatus');
    }
    
    getOPCBlockedParamList(){
      return this.http.get(environment.apiUrl+'GetOPCBlockedParamList');
    }
    addOPCBlockedParam(data:any) {
      return this.http.post(environment.apiUrl + 'AddOPCBlockedParam', data)
    }
    deleteOPCBlockedParam(data: any) {
      return this.http.post(environment.apiUrl + 'DeleteOPCBlockedParam',data);
    }
  
    getAllowedOpcTags(){
      return this.http.get(environment.apiUrl+'GetAllowedOpcTags');
    }
    addOpcTagtoAllowedList(data:any) {
      return this.http.post(environment.apiUrl + 'AddOpcTagtoAllowedList', data)
    }
    deleteOPCTagFromAllowedList(data: any) {
      return this.http.post(environment.apiUrl + 'DeleteOPCTagFromAllowedList',data);
    }
    
    getCompareView(){
      return this.http.post(environment.apiUrl+'GetCompareView','');
    }
    getDiscrepency(){
      return this.http.post(environment.apiUrl+'GetDiscrepency','');
    }
    getOPCView(){
      return this.http.post(environment.apiUrl+'GetOPCView','');
    }
    

    getChangeRequestDetails(){
      return this.http.get(environment.apiUrl+'GetChangeRequestDetails');
    }
    getChangeRequestDetailsDisApproved(){
      return this.http.get(environment.apiUrl+'GetChangeRequestDetails_DisApproved');
    }
    getChangeRequestDetailsPending(){
      return this.http.get(environment.apiUrl+'GetChangeRequestDetails_Pending');
    }
    getChangeRequestDetailsApproved(){
      return this.http.get(environment.apiUrl+'GetChangeRequestDetails_Approved');
    }
    
    addNewChangeRequest(data:any) {
      return this.http.post(environment.apiUrl + 'AddNewChangeRequest', data)
    }
    approveNewChangeRequest(data:any) {
      return this.http.post(environment.apiUrl + 'ApproveNewChangeRequest', data)
    }
    disApproveNewChangeRequest(data:any) {
      return this.http.post(environment.apiUrl + 'DisApproveNewChangeRequest', data)
    }
    
    getAuditModules(){
      return this.http.post(environment.apiUrl+'GetAuditModules','');
    }
    getAuditSubModules(){
      return this.http.post(environment.apiUrl+'GetAuditSubModules','');
    }
    getAuditLogs(data:any){
      return this.http.post(environment.apiUrl+'GetAuditLogs',data);
    }
    addNewAudit(data:any) {
      return this.http.post(environment.apiUrl + 'AddNewAudit', data)
    }

}
