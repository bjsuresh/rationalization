// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private pageNameSubject = new BehaviorSubject<string>('');

  pageName$ = this.pageNameSubject.asObservable();

  setPageName(pageName: string) {
    this.pageNameSubject.next(pageName);
  }

  public readExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const data: Uint8Array = new Uint8Array(e.target.result);
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });

        // Assuming you have a single sheet in the Excel file
        const sheetName: string = workbook.SheetNames[0];
        const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

        // Parse the sheet to JSON
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        resolve(jsonData);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  public readExcelFromAsset(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const filePath = 'assets/PVHI Parameter in CPP Area.xls'; // Adjust the path accordingly

      fetch(filePath)
        .then(response => response.arrayBuffer())
        .then(data => {
          const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });

          // Assuming you have a single sheet in the Excel file
          const sheetName: string = workbook.SheetNames[0];
          const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

          // Parse the sheet to JSON
          const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          resolve(jsonData);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
