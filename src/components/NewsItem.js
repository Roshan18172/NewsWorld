import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className="card" style={{ margin: "auto", height: "480px" }}>
                        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"85%",zIndex:'1'}}>{source && source.name ? source.name : source}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    <img src={imageUrl} className="card-img-top" alt="..." height="180px" />
                    <div className="card-body">
                        <h5 className="card-title">{title}......</h5>
                        <p className="card-text">{description}......</p>
                    </div>
                    <div className="card-footer text-center">
                        <a href={newsUrl} className="btn btn-primary">Read More</a>
                    </div>
                    <div className="card-footer text-center">
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewsItem
