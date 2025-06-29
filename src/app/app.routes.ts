import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { CompanyDashbordComponent } from './components/company-dashbord/company-dashbord.component';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    {
        path: "",
        component: HomePageComponent
    },
    {
        path: "home",
        component: HomePageComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "student-dashboard",
        component: StudentDashboardComponent
    },
    {
        path: "company-dashboard",
        component: CompanyDashbordComponent
    },
    {
        path: "admin-dashboard",
        component: AdminDashbordComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent
    }
];
