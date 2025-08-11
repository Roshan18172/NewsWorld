import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 4,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    async componentDidMount() {
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - News World`;
        this.updateOnRequest();
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
    async updateOnRequest() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        this.props.setProgress(30);
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults,
            page: this.state.page
        });
        this.props.setProgress(90);
        console.log(parsedData);
        this.props.setProgress(100);
    }
    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateOnRequest();
    }
    handleNextClick = async () => {
        const maxPage = Math.ceil(this.state.totalResults / this.props.pageSize);
        if (this.state.page < maxPage) {
            this.setState(
                prevState => ({ page: prevState.page + 1 }),
                () => this.updateOnRequest()
            );
        }
    }
    render() {
        return (
            <div className="container-fluid ">
                <h2 className=" text-center" style={{marginTop:"80px",marginBottom:"20px"}}>News World - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="container m-auto row bg-warning " style={{ marginBottom: "160px" }}>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-4" key={element.title}>
                            <NewsItem title={element.title ? element.title.slice(0, 52) : ""}
                                description={element.description ? element.description.slice(0, 80) : ""}
                                imageUrl={element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="}
                                newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between my-3" style={{ height: "80px" }}>
                </div>
                <div className="container d-flex justify-content-between my-3 fixed-bottom bg-success ">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark my-3" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <p className="text-center m-auto">Page {this.state.page} of {Math.ceil(this.state.totalResults / this.props.pageSize)}</p>
                    <button type="button" className="btn btn-dark my-3" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
