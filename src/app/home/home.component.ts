import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  list = [
    { name: 'Home', url: '/home/rationalisation', icon: 'home.gif', isActive: true },
    { name: 'Tag Selection', url: '/home/tag-selection', icon: 'tags.gif', isActive: false },
    { name: 'Enforce Todo List', url: '/home/enforce_todo_list', icon: 'check.gif', isActive: false },
    { name: 'Enforce Success List', url: '/home/enforce_success_list', icon: 'increase.gif', isActive: false },
    { name: 'Enforce Fail List', url: '/home/enforce_fail_list', icon: 'decrease.gif', isActive: false },
    { name: 'Enforce Tag List', url: '/home/enforce_tags', icon: 'tags.gif', isActive: false },
    { name: 'Users', url: '/home/users', icon: 'tickets.gif', isActive: false },
    { name: 'Priority Assist', url: '/home/priority-assist', icon: 'assist.gif', isActive: false },
    { name: 'Operator Assist', url: '/home/operator-assist', icon: 'assist.gif', isActive: false },
    { name: 'Master Data', url: '/home/master-data', icon: 'assist.gif', isActive: false },

    { name: 'Logout', url: '/login', icon: 'inbox.gif', isActive: false },
    // { name: 'Link 4', url: '/link4', isActive: false }
  ];
  PageName: any;

  constructor(private sharedService: SharedService,
    private apiService: ApiService
    ) {}

  ngOnInit() {
    this.sharedService.pageName$.subscribe((pageName) => {
      this.PageName = pageName;
    });

    // this.apiService.TagSelection().subscribe(data => {
    //   const abc = data;
    //     });
  }

}
