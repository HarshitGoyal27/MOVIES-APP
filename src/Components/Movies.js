import React, { Component } from 'react'
import axios from 'axios';
export default class Movies extends Component {
  constructor(){
    super();
    this.state={
      hover:'',
      parr:[1],
      currPage:1,
      movies:[],
      favourites:[]
    }
  }
  componentDidMount=async ()=>{//place where we send requests(side effect)
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
    this.setState({
      movies:[...res.data.results]
    },this.handleFavState);
    console.log('first');
  }
  
  changeMovies=async()=>{
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
    this.setState({
      movies:[...res.data.results]
    })
  }
  handleNext=()=>{
    let temparr=[];
    temparr=[...this.state.parr,this.state.parr.length+1];
    this.setState({
      parr:[...temparr],
      currPage:this.state.currPage+1,
    },this.changeMovies);//passing function reference coz setState() is ASYNC
  }
  handlePrevious=()=>{
    if(this.state.currPage!=1){
      this.setState({
        currPage:this.state.currPage-1,
      },this.changeMovies);
    }
  }
  handleClick=(val)=>{
    if(val!=this.state.currPage){
      this.setState({
        currPage:val
      },this.changeMovies);
    }
  }
  handleFav=(movie)=>{
    let oldData=JSON.parse(localStorage.getItem('movies-app') || '[]');
    if(this.state.favourites.includes(movie.id)){//remove ka case
        oldData=oldData.filter((m)=>m.id!=movie.id);
    }
    else{
        oldData.push(movie);
    }
    localStorage.setItem('movies-app',JSON.stringify(oldData));
    console.log(oldData);
    this.handleFavState();
  }
  handleFavState=()=>{
    let oldData=JSON.parse(localStorage.getItem('movies-app') || '[]');
    let temp=oldData.map((m)=>m.id);
    this.setState({
      favourites:[...temp]
    })
  }
  render() {
    // let movie=movies.results;//removing the static content
    console.log('second');
    return (
      <>
        {
          this.state.movies.length==0?
          <div className="spinner-border text-primary" role="status">
            <span className="visually hidden">Loading...</span>
          </div>:
          <div className='container-fluid' style={{border:'10px solid blue'}}>
            <div className='f1'>
              {
                this.state.movies.map((movieObj)=>(
                    <div className='card' key={movieObj.id} onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                      <img className='card-img' src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}></img>
                      <div className='card-img-overlay pics'>
                        <b className='card-title'>{movieObj.title}</b>
                        {
                          (this.state.hover===movieObj.id)?<button href='#' className='btn btn-primary temp-btn' onClick={()=>this.handleFav(movieObj)}>
                            {this.state.favourites.includes(movieObj.id)==false?'Add to Favourites':'Remove from favourites'}</button>:''
                        }
                      </div>
                    </div>
                ))
              }
            </div>
            <ul className="pagination">
              <li className={`page-item ${this.state.currPage==1? 'disabled':''}`}><a className="page-link" onClick={this.handlePrevious}>Previous</a></li>
              {this.state.parr.map((value) => (
                <li
                  className={`page-item ${this.state.currPage === value ? 'active' : ''}`}
                  key={value}
                  cust={value}
                  onClick={() => this.handleClick(value)}
                >
                  <a className="page-link">{value}</a>
                </li>
              ))}
              <li className="page-item"><a className="page-link" onClick={this.handleNext}>Next</a></li>
            </ul>
          </div>
        }
      </>
    )
  }
}
