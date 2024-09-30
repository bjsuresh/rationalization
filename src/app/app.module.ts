import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RationalisationComponent } from './rationalisation/rationalisation.component';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { TagSelectionComponent } from './tag-selection/tag-selection.component';
import { DxButtonModule, DxDateBoxModule, DxFileUploaderModule, DxFormModule, DxLinearGaugeModule, DxPopupModule, DxTabsModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { DxDataGridModule, DxCheckBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { UnapprovedRequestsComponent } from './unapproved-requests/unapproved-requests.component';
import { ProposedTagsComponent } from './proposed-tags/proposed-tags.component';
import { EnforceedTagsComponent } from './enforceed-tags/enforceed-tags.component';
import { ProposedChangesComponent } from './proposed-changes/proposed-changes.component';
import { ImportChangeRequestComponent } from './import-change-request/import-change-request.component';
import { EnforceTodoListComponent } from './enforce-todo-list/enforce-todo-list.component';
import { EnforceFailListComponent } from './enforce-fail-list/enforce-fail-list.component';
import { EnforceSuccessListComponent } from './enforce-success-list/enforce-success-list.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { PrioritiyComponent } from './prioritiy/prioritiy.component';
import { ImpactsComponent } from './impacts/impacts.component';
import { ConsequencesComponent } from './consequences/consequences.component';
import { CostFigComponent } from './cost-fig/cost-fig.component';
import { RespondTimeComponent } from './respond-time/respond-time.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { OperatoralrmAssistComponent } from './operatoralrm-assist/operatoralrm-assist.component';
import { RequestsOverviewComponent } from './requests-overview/requests-overview.component';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AddchangeRequestComponent } from './addchange-request/addchange-request.component';
import { CompareViewComponent } from './compare-view/compare-view.component';
import { TokenService } from './token.service';
import { DesignViewComponent } from './design-view/design-view.component';
import { AddDesignvalComponent } from './add-designval/add-designval.component';
import { ViewAssistComponent } from './view-assist/view-assist.component';
import { ImportTagsComponent } from './import-tags/import-tags.component';
import { TagsComponent } from './tags/tags.component';
import { OpcConfigurationComponent } from './opc-configuration/opc-configuration.component';
import { UsersComponent } from './users/users.component';
import { MasterpageComponent } from './masterpage/masterpage.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { HazardsComponent } from './hazards/hazards.component';
import { TimeconsequencesComponent } from './timeconsequences/timeconsequences.component';
import { PriorityIntervalsComponent } from './priority-intervals/priority-intervals.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RationalisationComponent,
    TagSelectionComponent,
    UnapprovedRequestsComponent,
    ProposedTagsComponent,
    EnforceedTagsComponent,
    ProposedChangesComponent,
    ImportChangeRequestComponent,
    EnforceTodoListComponent,
    EnforceFailListComponent,
    EnforceSuccessListComponent,
    PrioritiyComponent,
    ImpactsComponent,
    ConsequencesComponent,
    CostFigComponent,
    RespondTimeComponent,
    OperatoralrmAssistComponent,
    RequestsOverviewComponent,
    AddchangeRequestComponent,
    CompareViewComponent,
    DesignViewComponent,
    AddDesignvalComponent,
    ViewAssistComponent,
    ImportTagsComponent,
    TagsComponent,
    OpcConfigurationComponent,
    UsersComponent,
    MasterpageComponent,
    AddReviewComponent,
    HazardsComponent,
    TimeconsequencesComponent,
    PriorityIntervalsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    DxButtonModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxTabsModule,   
    DxDataGridModule,
    DxSelectBoxModule,
    DxFileUploaderModule,
    DxTextBoxModule,
    DxPopupModule,
    DxFormModule,
    DxTextAreaModule,
    DxDateBoxModule,
    HttpClientModule,
    MatExpansionModule,
    DxLinearGaugeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
