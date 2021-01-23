import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { AuthComponent } from "./auth/auth.component";
import { DashboardOverviewComponent } from "./components/dashboard-overview/dashboard-overview.component";

const routes: Routes = [
    { path: "", redirectTo: "auth", pathMatch: "full" },
    { path: "auth", component: AuthComponent },
    { path: "dashboard-overview", component: DashboardOverviewComponent },
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
