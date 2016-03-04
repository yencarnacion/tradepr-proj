import React, { Component } from 'react'
import { Link } from 'react-router'

class Highlights extends Component {

  render() {
    return (
      <div className='grid-content'>
        <h4 className='subheader'>
          Trade Highlights
        </h4>
        <p>Contents:</p>
        <ul>
          <li>
            <p><Link to={`/highlights/toptrading`}>Top Trading Partners</Link>
              <br/>
              Top 15 countries in total trade,
              exports and imports for the current
              year
            </p>
            </li>
        </ul>
      </div>
    );
  }
};

export default Highlights;
