import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-addchange-request',
  templateUrl: './addchange-request.component.html',
  styleUrls: ['./addchange-request.component.css']
})
export class AddchangeRequestComponent {
  RequestGroup: FormGroup;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private sharedService: SharedService,
    private apiService: ApiService
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
    // this.getAllTags();
    // this.getCompareView();
    // this.fetchProcessModes();
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
        // this.apiService.addNewChangeRequest(data).subscribe(
        //   (response: any) => {
        //     console.log('New Change Request added successfully:', response);
        //     this.snackBar.open('New Change Request add Successfully','',{
        //       duration: 1000
        //     });
        //     this.getChangeRequestDetails();
        //   },
        //   (error: any) => {
        //     console.error('Error adding New Change Request:', error);
        //     // Handle error
        //     this.snackBar.open('New Change Request add failed','',{
        //       duration: 2000
        //     });
        //   }
        // );
        // let action = 'Add';
        // this.getSubModule(action);
        // this.tabGroup.selectedIndex = 0; 

      }
    //    else {
    //   this.markFormGroupTouched(this.RequestGroup);
    // }
}

}
