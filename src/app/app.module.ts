import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './comps/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './comps/pokemon-detail/pokemon-detail.component';
import { PositionFormatPipe } from './pipes/position-format.pipe';
import { BannerTypeComponent } from './comps/banner-type/banner-type.component';
import { PokemonSpriteComponent } from './comps/pokemon-sprite/pokemon-sprite.component';
import { ReduceAtrNamePipe } from './pipes/reduce-atr-name.pipe';
import { EvolutionPhaseComponent } from './comps/evolution-phase/evolution-phase.component';
import { PokemonLinkComponent } from './comps/pokemon-link/pokemon-link.component';
import { PokeHeightPipe } from './pipes/poke-height.pipe';
import { PokeWeightPipe } from './pipes/poke-weight.pipe';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PositionFormatPipe,
    BannerTypeComponent,
    PokemonSpriteComponent,
    ReduceAtrNamePipe,
    EvolutionPhaseComponent,
    PokemonLinkComponent,
    PokeHeightPipe,
    PokeWeightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HammerModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
