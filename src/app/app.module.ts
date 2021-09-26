import { BrowserModule } from '@angular/platform-browser';
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
    PokemonLinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
