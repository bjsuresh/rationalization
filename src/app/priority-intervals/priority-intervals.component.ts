import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-priority-intervals',
  templateUrl: './priority-intervals.component.html',
  styleUrls: ['./priority-intervals.component.css']
})
export class PriorityIntervalsComponent {
  setPoint: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) 
  { }

  ngOnInit() {
    console.log(this.data);
    this.setPoint = this.data.value['Set_Point'];
  }
  customizeLabelText = (scaleValue: { value: number }) => {
    if (scaleValue.value < 10) {
        return 'Instrument Calibaration Range (min) (10)';
    } 
    else if (scaleValue.value < 20) {
        return 'Lower safe operating limit (20)';
    }
    else if (scaleValue.value < 30) {
      return 'Low Low Alarm Trip (30)';
    }
    else if (scaleValue.value < 40) {
      return 'Low Alarm (40)';
    }
    else if (scaleValue.value < 50) {
      return 'Lower Operating Limit (50)';
    }
    else if (scaleValue.value < 60) {
      return 'Operating Target (60)';
    }
    else if (scaleValue.value < 70) {
      return 'Upper Operating Limit (70)';
    }
    else if (scaleValue.value < 80) {
      return 'High Alarm (80)';
    }
    else if (scaleValue.value < 90) {
      return 'High High Alarm/Trip (90)';
    }
    else if (scaleValue.value < 100) {
      return 'Upper Safe Operating Limit (100)';
    }
    else {
        return 'Instrument Calibaration Range (max)';
    }
};

}
