import React, { Component } from 'react'
import {movies} from './getMovies.js'

export default class Favourites extends Component {
  constructor(){
    super();
    this.state={
      genres:[],
      currGenre:'All Genres',
      movies:[],
      currText:''
    }
  }
  componentDidMount(){
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    let data = JSON.parse(localStorage.getItem("movies-app") || "[]")
    let temp = []
    data.forEach((movieObj)=>{
        if(!temp.includes(genreids[movieObj.genre_ids[0]])){
          temp.push(genreids[movieObj.genre_ids[0]]);
      }
    });
    temp.unshift('All Genres');
    this.setState({
        genres:[...temp],
        movies:[...data]
    })
  }
  handleGenre=(genre)=>{
    this.setState({
      currGenre:genre
    })
  }
  render() {
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family',
     14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: ' ', 37: 'Western' };
    let filterarr=[];
    if(this.state.currText===''){filterarr=this.state.movies}
    else{
      filterarr=this.state.movies.filter((movieObj)=>{
        let title=movieObj.original_title.toLowerCase();
        return title.includes(`${this.state.currText.toLowerCase()}`);
      })
    }
    if(this.state.currGenre!=='All Genres'){
      filterarr=this.state.movies.filter((movies)=>genreids[movies.genre_ids[0]]==this.state.currGenre);
    }
    return (
      <div className='container-fluid mt-3' style={{border:'2px solid black'}}>
        <div className='row'>
          <div className='col-3'>
              <ul className="list-group">
                {
                    this.state.genres.map((uniqueGenres)=>(
                      this.state.currGenre==uniqueGenres?
                      <li className="list-group-item" style={{backgroundColor:'darkblue'}}>{uniqueGenres}</li>:
                      <li className="list-group-item"  onClick={()=>this.handleGenre(uniqueGenres)}>{uniqueGenres}</li>
                  ))
                }
            </ul>
          </div>
          <div className='col-9'>
            <div className='row'>
              <div className='col-6 '><input type='text' className='input-group-text' style={{width:'100%'}} placeholder='Search' onChange={(e)=>this.setState({currText:e.target.value})}/></div>
              <div className='col-6 '><input type='number' className='input-group-text' style={{width:'100%'}}/></div>
            </div>
            <div className='row'>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">Popularity</th>
                      <th scope="col">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                     filterarr.map((movieObj)=>(
                        <tr>
                          <th scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:'5rem',borderRadius:'5px'}}/>&nbsp;&nbsp;{movieObj.title}</th>
                          <td>{genreids[movieObj.genre_ids[0]]}</td>
                          <td>{movieObj.popularity}</td>
                          <td>{movieObj.vote_average}</td>
                          <td><button className='btn btn-danger'>Delete</button></td>{/**not responsive(i have to make)*/}
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
