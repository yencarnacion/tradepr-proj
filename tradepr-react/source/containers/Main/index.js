import React, { Component } from 'react'
import { Link } from 'react-router'
import { Trigger, Panel} from '../../vendor/react-foundation-apps'

class Main extends Component {

  render() {
    return (
      <div className='wrapper'>
          <div className='vertical grid-frame'>
            <div className='title-bar primary'>
              <span className='title'>Foreign Trade</span>
            </div>
            <div className='grid-block'>
              <Panel id='sidebar' className='medium-3 large-2 medium-grid-block sidebar vertical'>
                <div className='grid-content collapse'>
                  <Trigger close='sidebar'>
                    <a className='close-button hide-for-medium'>&times;</a>
                  </Trigger>
                  <section>
                    <ul className='menu-bar vertical'>
                      <li><Link to={`/highlights`}>Trade Highlights</Link></li>
                      <li><Link to={`/notdone`}>Balance by Partner Country</Link></li>
                      <li><Link to={`/notdone`}>Country/Product Trade</Link></li>
                      <li><Link to={`/notdone`}>State Data</Link></li>
                      <li><Link to={`/notdone`}>Historical Series</Link></li>
                      <li><Link to={`/notdone`}>Notices and Corrections</Link></li>
                      <li><Link to={`/notdone`}>Related Party Trade</Link></li>
                      <li><Link to={`/notdone`}>Other Release</Link></li>
                      <li><Link to={`/notdone`}>Data Products</Link></li>
                    </ul>
                  </section>
                </div>
              </Panel>
              <div className='medium-9 large-10 grid-content'>
                <div className='grid-container main-docs-section'>
                  <Trigger toggle='sidebar'>
                    <a className="small secondary expand button hide-for-medium">Show Sidebar</a>
                  </Trigger>
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Main;
