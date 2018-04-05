import * as React from 'react';
import { StoreType, PropsType } from './Routes';
import { ApplicationState } from '../store';

export default class About extends React.Component<PropsType, ApplicationState> {
	public render() {
		const markdown = this.props.about.markdown;
		return <div className="msg-body">
			<div className="msg-wrapper">
				<div className="msg-inner">
					<article dangerouslySetInnerHTML={{__html: markdown}}></article>	
				</div>
			</div>
		</div>;
	}
}
