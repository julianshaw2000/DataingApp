import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/memberList/memberList.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolvers';
import { MemberListResolver } from './_resolvers/member-list.resolvers';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolvers';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent },
    {   path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver} },
            {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
            {path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver},
                canDeactivate: [PreventUnsavedChanges]},
            {path: 'messages', component: MessagesComponent },
            {path: 'lists', component: ListComponent },
        ]},
   // {path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
  //  {path: 'messages', component: MessagesComponent },
  //  {path: 'lists', component: ListComponent },
    {path: '**', redirectTo: '', pathMatch: 'full' }
];
