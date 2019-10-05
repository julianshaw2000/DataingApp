import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './memberList/memberList.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent },
    {   path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
            {path: 'messages', component: MessagesComponent },
            {path: 'lists', component: ListComponent },
        ]},
   // {path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
  //  {path: 'messages', component: MessagesComponent },
  //  {path: 'lists', component: ListComponent },
    {path: '**', redirectTo: '', pathMatch: 'full' }
];