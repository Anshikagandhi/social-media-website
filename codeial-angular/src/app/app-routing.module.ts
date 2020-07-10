import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListsComponent } from './posts-lists/posts-lists.component';


/*step 1 */
const routes: Routes = 
[
  {path:'posts-lists',component: PostsListsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
