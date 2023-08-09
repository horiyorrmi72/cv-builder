import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HowtoComponent } from './howto/howto.component';
import { AboutComponent } from './about/about.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { EduComponent } from './edu/edu.component';
import { SkillsComponent } from './skills/skills.component';
import { PreviewComponent } from './preview/preview.component';
import { BioComponent } from './bio/bio.component';
import { ExperienceComponent } from './experience/experience.component';
import { DatapageComponent } from './datapage/datapage.component';





const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'data', component:DatapageComponent},
  {path:"signup", component:SignupComponent},
  {path:"login", component:LoginComponent},
  // {path:'skill', component:SkillsComponent},
  // {path:'edu', component:EduComponent},
  // {path:'preview', component:SignupComponent},
  // {path:'bio', component:BioComponent},
  // {path:'experience', component:ExperienceComponent},
  // {path:'portfolio', component:PortfolioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
