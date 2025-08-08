import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem", margin: "auto" ,height: "420px"}}>
            <img src={imageUrl} className="card-img-top" alt="..." height="180px" />
            <div className="card-body">
                <h5 className="card-title">{title}......</h5>
                <p className="card-text">{description}......</p>
            </div>
            <div className="card-footer text-center">
                <a href={newsUrl} className="btn btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
