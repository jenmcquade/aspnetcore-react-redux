import * as React from 'react';
import { Link } from 'react-router';

export class NavMenu extends React.Component<any, any> {
    public render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <svg className="alaska-logo" x="0px" y="0px" viewBox="0 0 114.7 34.1" enable-background="new 0 0 114.7 34.1"><path className="st2" d="M55.2,1.3L42.4,22.9c-1.3,2.2-2.1,4.5-2.3,6.6h-5c0.3-2.7,1.4-5.3,3.6-9l9-15.1c1.8-3,3.6-4.1,6.8-4.1H55.2z"></path><path className="st2" d="M54.2,24c-0.9,0.9-2.8,2.2-4.3,2.2c-1.1,0-1.1-1-0.4-2.4c2.7-5.2,5.6-7.9,9.1-7.9h0.6L54.2,24z M59,12.9 c-6.5,0-10.5,3.8-14.1,12.1c-0.9,2.1-1.4,4.7,1.6,4.6c1.7,0,4.6-1,6.6-2.4C53,28,52.9,29,52.9,29.5h4.6c0.2-1.8,0.8-4,2.3-6.7 l5.7-9.5C63.4,13.1,61.2,12.9,59,12.9z"></path><path className="st2" d="M101.2,24c-0.9,0.9-2.8,2.2-4.3,2.2c-1.1,0-1.1-1-0.4-2.4c2.7-5.2,5.6-7.9,9.1-7.9h0.6L101.2,24z M106,12.9 c-6.5,0-10.5,3.8-14.1,12.1c-0.9,2.1-1.4,4.7,1.6,4.6c1.7,0,4.6-1,6.6-2.4c-0.2,0.7-0.3,1.6-0.2,2.2h4.6c0.2-1.8,0.8-4,2.3-6.7 l5.7-9.5C110.4,13.1,108.2,12.9,106,12.9z"></path><path className="st2" d="M91.1,34.1h-1.5c-1.9,0-3.6-1.3-4.2-3.2l-2.3-8.6l-4.2,7.1H74l13.6-23c1.8-3,3.6-4.1,6.8-4.1H95l-9,15.3 l6.8-4.7h5.4l-11.4,7.9l0,0L91.1,34.1z"></path><path className="st2" d="M46.2,0c-4.6,0-7,1.2-11.5,4.5l-15.2,11H9.8c-2.8,0-5.1,0.1-6.9,1.8l-2.5,2.3c0,0,7.3-0.3,14.2-0.5L0,29.5 h6.3l14.9-10.8c2.9-0.1,4.9-0.2,4.9-0.2c3.5-0.1,5.4-3.1,5.4-3.1h-5.7l12.1-8.7l-8.9,14.5c-1.9,3.3-2.8,5.7-3.2,8.3h5.2 c0.2-2.2,0.9-4.4,2.3-6.6L45.4,2.5C46.3,1.1,47,0,47,0L46.2,0z"></path><path className="st2" d="M70.5,17.6c-0.1,0.4,0.1,0.7,1,1.3l1.4,0.9c1.5,1,2.1,2.5,1.9,3.7c-0.5,3.4-3,6.2-8.3,6.2 c-2.3,0-3.4-0.1-6.2-0.5l2.1-3.5c1.9,0.3,3,0.5,4.5,0.5c2,0,2.8-0.9,2.9-1.6c0.1-0.4-0.1-0.9-1.1-1.6l-1.1-0.8 c-1.8-1.3-2.2-2.3-2-3.8c0.4-3,3.9-5.3,8.8-5.3c1.5,0,3.2,0.1,5,0.3l-1.9,3.3c-1.2-0.1-3.1-0.2-4.5-0.1 C71.5,16.4,70.6,16.9,70.5,17.6z"></path><path className="st2" d="M112.1,24.6c1.4,0,2.6,1.2,2.6,2.6c0,1.4-1.1,2.6-2.6,2.6c-1.4,0-2.5-1.2-2.5-2.6 C109.6,25.8,110.7,24.6,112.1,24.6z M112.1,29.3c1.1,0,2-0.9,2-2.1c0-1.2-0.9-2.1-2-2.1s-2,0.9-2,2.1 C110.1,28.4,111,29.3,112.1,29.3z M111.8,28.6h-0.5v-2.8h1c0.5,0,1,0.4,1,0.9c0,0.4-0.3,0.7-0.6,0.8l0.6,1.1h-0.6l-0.6-1h-0.2 V28.6z M112.2,27.1c0.3,0,0.5-0.2,0.5-0.4c0-0.3-0.2-0.4-0.5-0.4h-0.4v0.8H112.2z"></path></svg>
                    <Link className='navbar-brand' to={'/'}>Flight Search</Link>
            </div>
            <div className='clearfix'></div>
            <div className='navbar-collapse collapse'>
                <ul className='nav navbar-nav'>
                    <li>
                        <Link to={'/'} activeClassName='active'>
                            <span className='glyphicon glyphicon-home'></span> Home
                            </Link>
                    </li>
                    <li>
                        <Link to={'/airport'} activeClassName='active'>
                            <span className='glyphicon glyphicon-search'></span> Search by Airport
                            </Link>
                    </li>
                    <li>
                        <Link to={'/filter'} activeClassName='active'>
                            <span className='glyphicon glyphicon-th-list'></span> Sort Results
                            </Link>
                    </li>
                    <li>
                        <Link to={'/about'} activeClassName='active'>
                            <span className='glyphicon glyphicon glyphicon-book'></span> About this App
                            </Link>
                    </li>
                </ul>
            </div>
        </div>
        </div >;
    }
}
