import { Component, Input, OnInit } from '@angular/core';
import { Util } from 'src/app/util/Util';

@Component({
  selector: 'app-evolution-phase',
  templateUrl: './evolution-phase.component.html',
  styleUrls: ['./evolution-phase.component.scss']
})
export class EvolutionPhaseComponent implements OnInit {
  @Input() phase: any;

  constructor() { }

  ngOnInit(): void {
  }

  getId() {
    if (this.phase) {
      return Util.getIdFromUrl(this.phase.species.url);
    }

    return null;
  }
}
