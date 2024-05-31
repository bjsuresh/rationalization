import { Component } from '@angular/core';

@Component({
  selector: 'app-proposed-changes',
  templateUrl: './proposed-changes.component.html',
  styleUrls: ['./proposed-changes.component.css']
})
export class ProposedChangesComponent {
  dataSource : any[] = [
    {
      id: 1,
      DynamicTagName: "I_IOCL",
      ProcessMode: "Feed Mix",
      TagName: "10FIC11",
      Parameter: "Range LO",
      ProposedValue: "65",
      ProposedDate: "24/Jan/2024 04:00 P.M",
      ProposedBy: "admin",
      ApprovedDateTime: "25/Jan/2024 10:00 A.M",
      ApprovedBy: "admin",
      DiasapprovedDate: "",
      DiasapprovedBy: ""
    },
    {
      id: 2,
      DynamicTagName: "I_IOCL",
      ProcessMode: "Feed Mix",
      TagName: "10FIC11",
      Parameter: "Range LO",
      ProposedValue: "65",
      ProposedDate: "24/Jan/2024 04:00 P.M",
      ProposedBy: "admin",
      ApprovedDateTime: "25/Jan/2024 10:00 A.M",
      ApprovedBy: "admin",
      DiasapprovedDate: "",
      DiasapprovedBy: ""
    },
    {
      id: 3,
      DynamicTagName: "I_Feed Mix",
      ProcessMode: "Feed Mix",
      TagName: "10FIC12",
      Parameter: "PVHI",
      ProposedValue: "76",
      ProposedDate: "24/Jan/2024 04:00 P.M",
      ProposedBy: "admin",
      ApprovedDateTime: "25/Jan/2024 10:00 A.M",
      ApprovedBy: "admin",
      DisapprovedDate: "",
      DisapprovedBy: ""
    },
    {
      id: 4,
      DynamicTagName: "I_Feed Mix",
      ProcessMode: "Feed Mix",
      TagName: "10FIC16",
      Parameter: "Inactive",
      ProposedValue: "76",
      ProposedDate: "24/Jan/2024 04:00 P.M",
      ProposedBy: "admin",
      ApprovedDateTime: "",
      ApprovedBy: "",
      DisapprovedDate: "25/Jan/2024 11:23 A.M",
      DisapprovedBy: "admin"
    },
  ]

}
