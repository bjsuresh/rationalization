import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
    @ViewChild(DxFormComponent, { static: false }) myform!: DxFormComponent;
  
    employee: FormGroup;
    cause_of_alarm: any;
    // causeAlarmItems: any[]=[];
    selectTabIndex:number = 0;
    popupPosition: any;

    tagsList:any[] = [];
    parameters:any[] = [];
  
    constructor(private fb: FormBuilder,private snackBar: MatSnackBar) {
      this.employee = this.fb.group({
        DCS_Tag: new FormControl('' ),
        Event_Type: new FormControl(''),
        // causeAlarmItems: this.fb.array([]),
        causeAlarmItems: this.fb.array([]),
        consequenceAlarmItems: this.fb.array([
  
        ]),
        operatorResItems: this.fb.array([
  
        ]),
        time: new FormControl(''),
        EffTime: new FormControl(''),
        comments: new FormControl(''),
        reviewDate: new FormControl(''),
        reviewBy: new FormControl('')
      });
  
      let arr = localStorage.getItem("TagsList");
      if(arr){
        const array = JSON.parse(arr);
        this.tagsList= array.map(arr => arr.tagname);
        console.log("tagsList",this.tagsList)
      }

      this.popupPosition = {
        of: window, at: 'top', my: 'top', offset: { y: 10 },
      };
    }
  
    onValChanged(e){
      let arr= localStorage.getItem("TagsList");
      if(arr){
        const array = JSON.parse(arr);
  
      const list =  array.filter(arr => arr.tagname === e.value);
      this.parameters = list.map(arr => arr.parameter);
      console.log("param",list,this.parameters)
      }
    }
  
    get causeAlarmItems(): FormArray {
      return this.employee.get('causeAlarmItems') as FormArray;
    }
  
    save(){
      if (this.employee.valid) {
        const formData = this.employee.value;
        
        let data = {
        "tag": formData.DCS_Tag,
        "EffTime": formData.EffTime,
        "type": formData.Event_Type,
        "cause_of_alarm": [formData.causeAlarmItems],
        "comments": formData.comments,
        "consequence_of_alarm": [formData.consequenceAlarmItems],
        "operator_response": [formData.operatorResItems],
        "reviewBy": formData.reviewBy,
        "reviewDate": formData.reviewDate,
        "time": formData.time
        }
    
        console.log("fd",formData, data);
        this.snackBar.open('Alarm Assist added Successfully','',{
          duration: 1000
        });
        this.selectTabIndex = 1;
        // this.saveDataToLocalStorage();
        this.employee.reset();
      }
    }
    // createDefaultControl(causeOfAlarm: string): FormGroup {
    //   return this.fb.group({
    //     cause_of_alarm: causeOfAlarm
    //   });
    // }
    
    createDefaultControl(data: any): FormGroup {
      return this.fb.group({
        "cause_of_alarm": data.cause_of_alarm
      });
    }
    addCauseAlarmItem(): void {
      this.causeAlarmItems.push(this.fb.control(''));
    }
    get consequenceAlarmItems(): FormArray {
      return this.employee.get('consequenceAlarmItems') as FormArray;
    }
    addConsequenceAlarmItem() {
      this.consequenceAlarmItems.push(this.fb.control(''));
    }
    // removeCauseAlarmItem(index: number) {
    //   (this.causeAlarmItems as unknown as FormArray).removeAt(index);
    // }
    removeCauseAlarmItem(index: number) {
      if (index >= 1) {
        this.causeAlarmItems.removeAt(index);
      }
    }
    removeConsequenceAlarmItem(index: number){
      if (index >= 1) {
        this.consequenceAlarmItems.removeAt(index);
      }
    }
    
    get operatorResItems(): FormArray {
      return this.employee.get('operatorResItems') as FormArray;
    }
    addResItem() {
      this.operatorResItems.push(this.fb.control(''));
    }
    removeResItem(index: number){
      if (index >= 1) {
        this.operatorResItems.removeAt(index);
      }
    }
  
    tagDataSource : any[] = [
      {
        id:1,
        tag: "10FIC11",
        description: "update",
        type: "PVHI",
        rangeHi: "100",
        rangeLow: "0",
        engUnits: "%",
        DCS_Node: "55",
        processSection: "6"
      },
      {
        id:2,
        tag: "10FIC12",
        description: "update",
        type: "PVHI",
        rangeHi: "100",
        rangeLow: "0",
        engUnits: "%",
        DCS_Node: "55",
        processSection: "6"
      }
    ];

    evntTrtsDatasource : any[] = [
      {
        id:1,
        type: "PVHI",
        treatno: 42
      },
      {
        id:2,
        type: "PVHI",
        treatno: 0
      },
      {
        id:3,
        type: "PVHI",
        treatno: 2
      },
    ]
    eventsDataSource : any[] = [
      {
        id: 1,
        type: "LIM",
        qualifier: "Hi",
        property: "",
        ON_text: "",
        OFF_text: "",
        Set_Point: "20",
        Priority: "0",
        treatno: "",
        PRTEno:"1",
        Enabled: true,
        Active: false,
        Blocked: false,
        Ext_SP:"",
        EngUnits:"",
        dir: ""
      },
      {
        id: 2,
        type: "LIM",
        qualifier: "Lo",
        property: "",
        ON_text: "",
        OFF_text: "",
        Set_Point: "-15",
        Priority: "0",
        treatno: "",
        PRTEno:"2",
        Enabled: true,
        Active: false,
        Blocked: false,
        Ext_SP:"",
        EngUnits:"",
        dir: ""
      },
      {
        id: 3,
        type: "LIM",
        qualifier: "HHi",
        property: "",
        ON_text: "",
        OFF_text: "",
        Set_Point: "60",
        Priority: "0",
        treatno: "",
        PRTEno:"1",
        Enabled: true,
        Active: false,
        Blocked: false,
        Ext_SP:"",
        EngUnits:"",
        dir: ""
      },
    ]
    ngOnInit() {
      const storedData = localStorage.getItem('alrm_assists');
      // this.dataSource = storedData ? JSON.parse(storedData) : this.dataSource;
    }
  
    // saveDataToLocalStorage() {
    //   console.log("alrm_assists",this.dataSource);
    //   const dataToSave = JSON.stringify(this.dataSource);
    //   localStorage.setItem('alrm_assists', dataToSave);
    // }
  
  }