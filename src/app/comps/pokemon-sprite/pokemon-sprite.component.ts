import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-sprite',
  templateUrl: './pokemon-sprite.component.html',
  styleUrls: ['./pokemon-sprite.component.scss']
})
export class PokemonSpriteComponent implements OnInit {
  @Input() src: string = '';
  @Input() color: string = 'grey';
  @Input() size: string = 'mini';

  constructor() { }

  ngOnInit(): void {
  }

}
