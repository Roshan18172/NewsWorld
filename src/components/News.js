import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    async componentDidMount() {
        // Simulating an API call to fetch news articles
        // In a real application, you would replace this with an actual API call
        let url= `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=46efa12190ad4529ac392f8a69578a01&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults,
            page: 1
        });
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            totalResults: 0,
            loading: false,
            page: 1
        }
    }
    handlePrevClick = async () => {
        console.log("Previous");
        let url= `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=46efa12190ad4529ac392f8a69578a01&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        });
    }
    handleNextClick = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url= `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=46efa12190ad4529ac392f8a69578a01&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            });
        }
    }
  render() {
    return (
      <div className="container-fluid ">
        <h2 className="my-3 text-center">News World - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="container m-auto row bg-warning ">
            {!this.state.loading && this.state.articles.map((element) => {
                return <div className="col-md-3 my-4" key={element.title}>
                    <NewsItem title={element.title ? element.title.slice(0, 52) : ""} 
                            description={element.description ? element.description.slice(0, 90) : ""} 
                            imageUrl={element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="} 
                            newsUrl={element.url} />
                    </div>
            })}

        </div>
        <div className="container d-flex justify-content-between my-3 fixed-bottom">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark my-3" onClick={this.handlePrevClick}> &larr; Previous</button>
            <p className="text-center m-auto">Page {this.state.page} of {Math.ceil(this.state.totalResults / this.props.pageSize)}</p>
            <button  type="button" className="btn btn-dark my-3" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
