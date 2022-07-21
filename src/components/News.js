import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${capitalizeFirstLetter(props.category)} - NewsHub`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  });

  // const handlePrevClick = async () => {
  //   setPage(page-1);
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   setPage(page+1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    setPage(page+1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8e49a9e0a89642b8b5a26f02a918d315&page=${page}&pageSize=${props.pageSize}`;
    // setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };


    return (
      <>
        <h1 className='text-center' style={{margin: '35px 0'}}>Fresh News - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
          >
          <div className='container my-3'>
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishDate={element.publishedAt} source={element.source.name}/>
                </div>
              })}
            </div>
        </div>
        </InfiniteScroll>


        {/* <div className="d-flex justify-content-between">
          <button disabled={page<=1} type="button" className="btn btn-success" onClick={handlePrevClick}> &larr; Previous </button>
          <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-success" onClick={handleNextClick}> Next &rarr; </button>
        </div> */}

      
      </>
    )

}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
