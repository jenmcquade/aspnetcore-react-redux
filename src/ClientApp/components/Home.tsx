import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    public render() {
        return <div className="msg-body">
            <div className="msg-wrapper">
                <div className="msg-inner">
                    <h1>Find Your Connections</h1>
                    <Link className='btn btn-lg btn-primary' to={'/airport'}>Begin Search</Link>
                </div>
            </div>
        </div>;
    }
}
