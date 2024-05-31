import { Component } from '@angular/core';

@Component({
  selector: 'app-proposed-tags',
  templateUrl: './proposed-tags.component.html',
  styleUrls: ['./proposed-tags.component.css']
})
export class ProposedTagsComponent {
  dataSource : any[] = [
    {
      id:1,
      tagname: "10FIC11",
      parameter: "PVHI",
      proposedValue: "65"
    },
    {
      id:2,
      tagname: "10FIC12",
      parameter: "PVHI",
      proposedValue: "76"
    }
  ]

}
