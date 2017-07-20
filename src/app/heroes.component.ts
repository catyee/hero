import {Component, OnInit} from '@angular/core';
import {Hero} from "./hero";
import {HEROES} from "./mock-heroes";
import {HeroService} from "./hero.service";
import {Router} from "@angular/router";
@Component({
  selector: 'my-heroes',
  templateUrl: './app.component.html',
  styleUrls:['./heroes.component.css']
})

export class HeroesComponent implements OnInit{
  title = 'tour';
  heroes:Hero[]
  selectedHero: Hero;
  constructor(private heroService:HeroService,private router:Router){}
  getHeros():void{
   this.heroService.getHeroes().then(heroes=>this.heroes=heroes);
  }
  onSelect(hero:Hero):void{
    this.selectedHero = hero;
  }
  gotoDetail():void{
    this.router.navigate(['/detail',this.selectedHero.id])
  }
  ngOnInit():void{
    this.getHeros();
  }
}
