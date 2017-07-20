import {Component, Input, OnInit} from "@angular/core";
import {Hero} from "./hero";
import {HeroService} from "./hero.service";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {Location} from "@angular/common";
@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls:['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{
 @Input() hero:Hero;
  constructor(
    private heroService:HeroService,
    private route : ActivatedRoute,
    private location:Location
  ){}

  ngOnInit() {
  this.route.params
    .switchMap((params: Params) => this.heroService.getHero(+params['id']))
    .subscribe(hero => this.hero = hero);
  }
  goback():void{
    this.location.back();
  }
}
