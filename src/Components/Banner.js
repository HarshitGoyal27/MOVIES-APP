import { movies } from "./getMovies.js";
import React, { Component } from "react";

export default class Banner extends Component {
  constructor() {
    super();
    this.temp = `https://image.tmdb.org/t/p/original${movies.results[0].poster_path}`;
  }
  render() {
    return (
      <>
        <div className="card" style={{width:'100%',height:'70vh',marginTop:'0.5rem'}}>
          <img className='card-img' src={this.temp} style={{height:'100%'}}></img>
          <div className="card-img-overlay">
            <div className='card-text'>
              <div temp='first'>
                  Female adventurer Parker joins a crew of male trophy hunters in a remote wilderness park. 
                  Their goal: slaughter genetically recreated dinosaurs for sport using rifles, arrows, and grenades.
                  After their guide is killed by raptors, the team tries to escape the park – but the hunters quickly become the hunted. 
                  Even worse, the park’s manager suspects Parker of being a spy and sends a hit squad after her. This battle’s about to become 
                  primitive!
              </div>
            </div>
            <button type="button" className="btn btn-primary mt-1">ADD TO FAVOURITES</button>
          </div>
        </div>
      </>
    );
  }
}
