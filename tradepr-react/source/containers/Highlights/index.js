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
        <dl>
            <dt><Link to={`/highlights/toptrading`}>Top Trading Partners</Link></dt>
            <dd>
              Top 15 countries in total trade,
              exports and imports for the current
              year
            </dd>
        </dl>
      </div>
    );
  }
};

export default Highlights;
