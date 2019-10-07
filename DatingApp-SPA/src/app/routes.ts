import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/memberList/memberList.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolvers';
import { MemberListResolver } from './_resolvers/member-list.resolvers';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent },
    {   path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent, canActivate: [AuthGuard],
                resolve: {users: MemberListResolver} },
            {path: 'members/:id', component: MemberDetailComponent, canActivate: [AuthGuard],
                resolve: {user: MemberDetailResolver} },
            {path: 'messages', component: MessagesComponent },
            {path: 'lists', component: ListComponent },
        ]},
   // {path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
  //  {path: 'messages', component: MessagesComponent },
  //  {path: 'lists', component: ListComponent },
    {path: '**', redirectTo: '', pathMatch: 'full' }
];
