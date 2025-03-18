import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';

//authGuard - protecting from acessing components in client
//dummy route - having child routes that inherit authGuard and url from it
export const routes: Routes = [
    {path: '', component: HomeComponent},
    //dummy route
    {path: '', 
        runGuardsAndResolvers: 'always', 
        canActivate: [authGuard], 
        children: [
            {path: 'members', component: MemberListComponent},
            {path: 'members/:id', component: MemberDetailComponent},
            {path: 'lists', component: ListsComponent},
            {path: 'messages', component: MessagesComponent},
        ]
    },
    
    {path: '**', component: HomeComponent, pathMatch: 'full'}
];
