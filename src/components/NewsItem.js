import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, publishDate, source } = this.props;
    return (
      <div className='my-3'>
            <div className="card">
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'absolute',
                right: '0',
              }}>
                <span className="badge rounded-pill bg-danger" style={{left:"80%", zIndex:"1"}}>{source}</span>

              </div>
                <img src={imageUrl?imageUrl:"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title?title:""}</h5>
                        <p className="card-text">{description?description:""}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(publishDate).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
