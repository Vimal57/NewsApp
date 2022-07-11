import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8e49a9e0a89642b8b5a26f02a918d315&page=${this.state.page}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles})
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8e49a9e0a89642b8b5a26f02a918d315&page=${this.state.page}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    })
  }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)) {

    } else {
      console.log("next clicked");
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8e49a9e0a89642b8b5a26f02a918d315&page=${this.state.page}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log("data :: ", parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
      })
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1>Fresh News - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
        </div>
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-success" onClick={this.handlePrevClick}> &larr; Previous </button>
          <button type="button" className="btn btn-success" onClick={this.handleNextClick}> Next &rarr; </button>
        </div>
      </div>
    )
  }
}

export default News
