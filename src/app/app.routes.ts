import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    }
];
// This is how you create a route, inside the routes array, pass an object with path and the component you want to render in that path.