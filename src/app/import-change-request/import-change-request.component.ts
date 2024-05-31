import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-import-change-request',
  templateUrl: './import-change-request.component.html',
  styleUrls: ['./import-change-request.component.css']
})
export class ImportChangeRequestComponent {

  processModeColumns = [
    {
      id:1,
      name: 'process mode'
    },
    {
      id:2,
      name: 'feed mix'
    }
  ]

  constructor(
    private sharedService: SharedService
  ){}

  onFileChange(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.sharedService.readExcel(file)
        .then((data: any[]) => {
          console.log('Excel data:', data);
          // Process the Excel data as needed
        })
        .catch((error) => {
          console.error('Error reading Excel file:', error);
        });
    }
  }
}
