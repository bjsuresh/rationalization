  import { Component, ViewChild } from '@angular/core';
  import { FormArray, FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { DxFormComponent } from 'devextreme-angular';
import { PriorityIntervalsComponent } from '../priority-intervals/priority-intervals.component';
  
  @Component({
    selector: 'app-masterpage', 
    templateUrl: './masterpage.component.html',
    styleUrls: ['./masterpage.component.css']
  })
  export class MasterpageComponent {
      @ViewChild(DxFormComponent, { static: false }) myform!: DxFormComponent;
    
      employee: FormGroup;
      filterGrp: FormGroup;
      cause_of_alarm: any;
      // causeAlarmItems: any[]=[];
      selectTabIndex:number = 0;
      selectEvntTabIndex: number = 0;
      popupPosition: any;
  
      tagsList:any[] = [];
      parameters:any[] = [];
    
      constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private dialog: MatDialog) {
        this.employee = this.fb.group({
          DCS_Tag: new FormControl('',Validators.required),
          type: new FormControl('',Validators.required),
          PRTENo: new FormControl('',Validators.required),
          comments: new FormControl('',Validators.required),
          screen: new FormControl(''),
          EffTime: new FormControl(''),
          reviewDate: new FormControl('',Validators.required),
          reviewBy: new FormControl('',Validators.required),
          reviewPriority: new FormControl(''),
          ruleDate: new FormControl('',Validators.required),
          ruleApplied: new FormControl('')
        });
        this.filterGrp = this.fb.group({
          loop_no: new FormControl('' ),
          platform: new FormControl('' ),
          system: new FormControl('' ),
          pid: new FormControl('' ),
          cause_effect: new FormControl('')
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
      formatDate(date: Date): string {
        const year = date.getFullYear();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const day = ('0' + date.getDate()).slice(-2);
        return `${day}-${month}-${year}`;
      }  
      save(){
        if (this.employee.valid) {
          const formData = this.employee.value;
          
          let data = {
          "tag": formData.DCS_Tag,
          "type": formData.type,
          "PRTENo": [formData.PRTENo],
          "comments": formData.comments,
          "screen": [formData.screen],
          "EffTime": formData.EffTime,
          "reviewPriority": [formData.reviewPriority],
          "reviewBy": formData.reviewBy,
          "reviewDate": this.formatDate(formData.reviewDate),
          "ruleDate": this.formatDate(formData.ruleDate),
          "ruleApplied": formData.ruleApplied,
          "id": this.getIdNo() 
          }

          console.log("fd",formData, data);
          this.reviews.push(data);
          this.snackBar.open('Alarm Review added Successfully','',{
            duration: 1000
          });
          this.selectTabIndex = 1;
          this.saveDataToLocalStorage();
          this.employee.reset();
        }
      }
      // createDefaultControl(causeOfAlarm: string): FormGroup {
      //   return this.fb.group({
      //     cause_of_alarm: causeOfAlarm
      //   });
      // }

      isShowSysPopup: boolean = false;
      isShowAlrmPopup: boolean = false;
      isShowOperatorResPopup: boolean = false;
      isShowAlrmRevsPopup: boolean = false;
      isShowChangeNotesPopup: boolean = false;
      isShowOperatorResEditPopup: boolean = false;
      isShowExtDataPopup: boolean = false;
      isShowPrityPopup: boolean = false;

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
          type: "PVHI",
          treatno: 42
        },
        {
          type: "PVHI",
          treatno: 0
        },
        {
          type: "PVHI",
          treatno: 2
        },
      ];
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
      ];
      platforms: any[] = ["platfrom1","platform2","platform3"];
      systems: any[] = [
        {
          id:1,
          systemName:"system1"
        },
        {
          id:2,
          systemName:"system2"
        },
        {
          id:3,
          systemName:"system3"
        },
        {
          id:4,
          systemName:"system4"
        },
        {
          id:5,
          systemName:"system5"
        }
        
      ];
      alarms: any[] =[
        {
          id:1,
          alarmName:"alarm1"
        },
        {
          id:2,
          alarmName:"alarm2"
        },
        {
          id:3,
          alarmName:"alarm3"
        },
        {
          id:4,
          alarmName:"alarm4"
        },
        {
          id:5,
          alarmName:"alarm5"
        }
      ];
      responses: any[] =[
        {
          id:1,
          responses:"Verify automatic action can be taken"
        },
        {
          id:2,
          responses:"If no reply 3 mins then executive action initiate to shutdown"
        },
        {
          id:3,
          responses:"If device inhibited removed to initiate shutdown"
        },
        {
          id:4,
          responses:"If alarm genuine or Area operator cannot be contacted, activate GPA"
        },
        {
          id:5,
          responses:"If another gas detector activates, initiate ESO, GPA immediately"
        }
      ]
      reviews: any[] =[
        {
          id:1,
          tag:"10FIC01",
          type: "PVHI",
          PRTENo: "2",
          reviewBy:"user1",
          reviewDate:"23-05-24",
          comments: "review good rating and performance"
        },
        {
          id:2,
          tag:"10FIC02",
          type: "PVHI",
          PRTENo: "2",
          reviewBy:"user2",
          reviewDate:"23-05-24",
          comments: "review good rating and performance"
        },
        {
          id:3,
          tag:"10FIC03",
          type: "PVHI",
          PRTENo: "2",
          reviewBy:"user1",
          reviewDate:"23-05-24",
          comments: "review good rating and performance"
        }
      ];
      notes: any[] =[
        {
          id:1,
          notes:"Tag reference document number is 007A12"
        },
        {
          id:2,
          notes:"changed by user1"
        },
        {
          id:3,
          notes:"priority value was change by user2"
        },
        {
          id:4,
          notes: "Tag reference document number is 112A05"
        }
      ];
      systemPopup(){ 
        this.isShowSysPopup = true;
      }
      alarmPopup(){ 
        this.isShowAlrmPopup = true;
      }
      responsePopup(){ 
        this.isShowOperatorResPopup = true;
      }
      editResponsePopup(){
        this.isShowOperatorResEditPopup = true;
      }
      externalData(){
        this.isShowExtDataPopup = true;
      }
      assessPriority(){
        this.isShowPrityPopup = true;
      }
      alrmReviewsPopup(){ 
        const storedData2= localStorage.getItem('reviews');
        this.reviews = storedData2 ? JSON.parse(storedData2) : this.reviews;
        this.isShowAlrmRevsPopup = true;
      }
      changeNotesPopup(){ 
        this.isShowChangeNotesPopup = true;
      }
      customizeColumns(columns: any) {
        const customColumn = {
          caption: 'Safe Operating Envelope', // Caption for the column header
          cellTemplate: 'customCellTemplate',
          cssClass: 'custom-column-header' // Specifies a custom cell template for the column
        };

        columns.unshift(customColumn);
      }
      openDialog(data:any) {
        const name=data.row.data;
        console.log('Editing row:', data, name);

        this.dialog.open(PriorityIntervalsComponent, {
          // width: '40%',
          height: '90%',
          data: {
            value: name,
          },
        });
      }

      ngOnInit() {
        const storedData = localStorage.getItem('tagDataSource');
        this.tagDataSource = storedData ? JSON.parse(storedData) : this.tagDataSource;
        const storedData1= localStorage.getItem('eventsDataSource');
        this.eventsDataSource = storedData1 ? JSON.parse(storedData1) : this.eventsDataSource;
        const storedData2= localStorage.getItem('reviews');
        this.reviews = storedData2 ? JSON.parse(storedData2) : this.reviews;
      }
    
      saveDataToLocalStorage() {
        console.log("reviews",this.reviews);
        const dataToSave = JSON.stringify(this.reviews);
        localStorage.setItem('reviews', dataToSave);

        const eventsdata = JSON.stringify(this.eventsDataSource);
        localStorage.setItem('eventsDataSource', eventsdata);
      }
      getIdNo(): number {
        const maxIndex = this.reviews.reduce((max, item) => Math.max(max, +item.id), 0);
        return maxIndex + 1;
      }
      addEvent(event: any) {
        const newId = this.getEvntsIdNo();
        event.data.id = newId;
      }
    
      onRowInserted(event: any) {
        // this.eventsDataSource.push(event.data); // Add the new data to the data source
        console.log("adds", event.data.value, event.data);
        this.saveDataToLocalStorage();
      }
    
      updateEvent(event: any) {
        const id = event.key;
        const updatedData = { ...event.oldData, ...event.newData };
        const index = this.eventsDataSource.findIndex(item => item.id === id);
        if (index !== -1) {
          this.eventsDataSource[index] = updatedData;
        }
        this.saveDataToLocalStorage();
        console.log("updatedData", updatedData);
      }
      getEvntsIdNo(): number {
        const maxIndex = this.eventsDataSource.reduce((max, item) => Math.max(max, +item.id), 0);
        return maxIndex + 1;
      }
      deleteEvent(event:any){
        console.log("efvt",event.data)
        const deletedId = event.data.id;
        this.eventsDataSource = this.eventsDataSource.filter(item => item.id !== deletedId);
        this.saveDataToLocalStorage();
      }
    
    }