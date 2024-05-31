import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DxFormComponent } from 'devextreme-angular';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-operatoralrm-assist',
  templateUrl: './operatoralrm-assist.component.html',
  styleUrls: ['./operatoralrm-assist.component.css']
})
export class OperatoralrmAssistComponent {
  @ViewChild(DxFormComponent, { static: false }) myform!: DxFormComponent;

  employee: FormGroup;
  cause_of_alarm: any;
  // causeAlarmItems: any[]=[];
  selectTabIndex:number = 0;
  
  causeAlarmItemsAss1: any[] = [
    { label: "Purpose / Cause of alarm 1",dataField: 'cause_alarm1' },
    { label: "Purpose / Cause of alarm 2",dataField: 'cause_alarm2' },
    { label: "Purpose / Cause of alarm 3",dataField: 'cause_alarm3' },
    { label: "Purpose / Cause of alarm 4",dataField: 'cause_alarm4' },
  ];

  consequenceAlarmItemsAss1: any[] = [
    { label: "Consequence if alarm ignored 1",dataField: 'consequence_alarm1' },
    { label: "Consequence if alarm ignored  2",dataField: 'consequence_alarm2' },
    { label: "Consequence if alarm ignored 3",dataField: 'consequence_alarm3' },
    { label: "Consequence if alarm ignored 4",dataField: 'consequence_alarm4' },
  ];
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
      this.dataSource.push(data);
      this.snackBar.open('Alarm Assist added Successfully','',{
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

  // ngAfterViewInit() {
  //   this.myform.instance.validate();
  // }

  addCauseAlarmItemAss1() {
    this.causeAlarmItemsAss1.push({label: "Purpose / Cause of alarm",dataField: 'cause_alarm5'});
  }

  addConsequenceAlarmItemAss1(){
    this.consequenceAlarmItemsAss1.push({label: "Consequence if alarm ignored",dataField: 'consequence_alarm5'});
  }

  dataSource : any[] = [
    {
      id:1,
      tag: "10FIC11",
      type: "PVHI",
      cause_of_alarm: ["low gas level detected","low level"],
      consequence_of_alarm: ["Potential for gas cloud build up yo high explosive linits"],
      time: "immediate < 5 mins",
      EffTime: "",
      operator_response: ["Verfy automatic acction to be taken, follow instructions","if no reply in 3 minutes then"],
      comments: "just checking testing",
      reviewBy: "admin"
    },
    {
      id:2,
      tag: "10FIC12",
      type: "PVHI",
      cause_of_alarm: ["low gas level detected","low level"],
      consequence_of_alarm: ["Potential for gas cloud build up yo high explosive linits"],
      time: "immediate < 5 mins",
      EffTime: "",
      operator_response: ["if device inhibited removed to initiate shutdown"],
      comments: "Testing levels",
      reviewBy: "admin"
    }
  ];
  
  ngOnInit() {
    const storedData = localStorage.getItem('alrm_assists');
    this.dataSource = storedData ? JSON.parse(storedData) : this.dataSource;
  }

  saveDataToLocalStorage() {
    console.log("alrm_assists",this.dataSource);
    const dataToSave = JSON.stringify(this.dataSource);
    localStorage.setItem('alrm_assists', dataToSave);
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
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Operator-Assists.xlsx"); 
          }); 
      }); 
  } 
  else if (e.format === 'pdf') {
      const doc = new jsPDF({
        orientation: 'landscape', // Set orientation to landscape
        format:[500, 300],
        unit: 'mm',
    });
      exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
          indent: 5,
        }).then(() => {
          doc.save('Operator-Assists.pdf');
      });
  }

  }
}