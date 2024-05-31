import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RationalisationComponent } from './rationalisation/rationalisation.component';
import { TagSelectionComponent } from './tag-selection/tag-selection.component';
import { ProposedTagsComponent } from './proposed-tags/proposed-tags.component';
import { ProposedChangesComponent } from './proposed-changes/proposed-changes.component';
import { EnforceedTagsComponent } from './enforceed-tags/enforceed-tags.component';
import { EnforceTodoListComponent } from './enforce-todo-list/enforce-todo-list.component';
import { EnforceFailListComponent } from './enforce-fail-list/enforce-fail-list.component';
import { EnforceSuccessListComponent } from './enforce-success-list/enforce-success-list.component';
import { PrioritiyComponent } from './prioritiy/prioritiy.component';
import { RequestsOverviewComponent } from './requests-overview/requests-overview.component';
import { OperatoralrmAssistComponent } from './operatoralrm-assist/operatoralrm-assist.component';
import { DesignViewComponent } from './design-view/design-view.component';
import { ImportTagsComponent } from './import-tags/import-tags.component';
import { OpcConfigurationComponent } from './opc-configuration/opc-configuration.component';
import { UsersComponent } from './users/users.component';
import { MasterpageComponent } from './masterpage/masterpage.component';
import { AddReviewComponent } from './add-review/add-review.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    component: RationalisationComponent,
    path: 'rationalisation',
  },
  {
      path: 'home',
      component: HomeComponent,
      children: [
        {
          component: RationalisationComponent,
          path: 'rationalisation',
        },
        {
          component: TagSelectionComponent,
          path: 'tag-selection',
        },
        {
          path: '',
          redirectTo: 'rationalisation',
          pathMatch: 'full',
        },
        {
          component: ProposedTagsComponent,
          path: 'proposed_tags',
        },
        {
          component: ProposedChangesComponent,
          path: 'audit-log',
        },
        {
          component: EnforceTodoListComponent,
          path: 'enforce_todo_list',
        },
        {
          component: EnforceFailListComponent,
          path: 'enforce_fail_list',
        },
        {
          component: EnforceSuccessListComponent,
          path: 'enforce_success_list',
        },
        {
          component: EnforceedTagsComponent,
          path: 'enforce_tags',
        },
        {
          component: PrioritiyComponent,
          path: 'priority-assist'
        },
        {
          component: OperatoralrmAssistComponent,
          path: 'operator-assist'
        },
        {
          path: 'change-requests',
          component: RequestsOverviewComponent
        },
        {
          component: DesignViewComponent,
          path: "designview"
        },
        {
          component: ImportTagsComponent,
          path: "import-tags"
        },
        {
          component: UsersComponent,
          path: "users"
        },
        {
          component: OpcConfigurationComponent,
          path: "opc-config"
        },
        {
          component: MasterpageComponent,
          path:"master-data"
        },
        {
          component:AddReviewComponent,
          path:"add-review"
        }
      ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
