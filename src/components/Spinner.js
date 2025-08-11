import React, { Component } from 'react'
import spinnerGif from './Spinner.gif';

export class Spinner extends Component {
  render() {
    return (
    <div>
        <div className="text-center">
          <img src={spinnerGif} alt="Loading..." />
          <h2>Loading...</h2>
        </div>
    </div>
    )
  }
}
export default Spinner