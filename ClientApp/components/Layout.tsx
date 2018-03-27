import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { connect } from 'react-redux';
import { StoreType, PropsType } from './Routes';
import { ApplicationState } from '../store';
import * as SearchState from '../store/Search';

class Layout extends React.Component<PropsType, ApplicationState> {
	public render() {
		return <div className="container-fluid h-100">
			<Row className="justify-content-center h-100">
				<Col id="contextNav" className="h-100 col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 hidden-md-down">
					<section>
						<NavMenu {...this.props} />
					</section>
				</Col>
				<Col id="contextBody" className="h-100 col-6 col-sm-8 col-md-8 col-lg-7 col-xl-7 align-self-start">
					<section>
						{this.props.children}
					</section>
				</Col>
			</Row>
		</div>
	}
}
export default connect(
	(state: ApplicationState) => state, // Selects which state properties are merged into the component's props
	SearchState.actionCreators, // Selects which action creators are merged into the component's props
)(Layout);


