import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';

import {
	Map,
	Joystick,
	ButtonBar,
	ButtonType,
} from '../components';
import Screen from './Screen';
import CONSTS from '../constants';


class StudyScreen extends Component {
	constructor() {
		super();
		this.onJoystickSelect = this.onJoystickSelect.bind(this);
	}

	onJoystickSelect() {
		this.props.dispatch({ type: 'SET_ZONES' });
	}

	openForm() {
		Navigation.showModal({
			screen: CONSTS.SCREENS.SEARCH_CONFIRMATION,
			passProps: {
				taxon: CONSTS.MOCKS.TAXON,
			},
			navigatorStyle: {
				navBarHidden: true,
			},
		});
	}

	get zoneSelectionMode() {
		return !!(this.props.map && this.props.map.zones && this.props.map.zones.length);
	}

	get groupSelectionMode() {
		return !(this.props.map && this.props.map.zones && this.props.map.zones.length);
	}

	render() {
		const buttons = [
			{
				key: ButtonType.BACK,
				action: () => this.props.dispatch({ type: 'RESET_MAP' }),
			},
		];

		return (
			<Screen>
				<Map {...this.props.map} onOpenAnnotation={() => this.openForm()} />
				{ this.groupSelectionMode &&
					<Joystick
						options={CONSTS.MOCKS.GROUPS}
						onSelect={this.onJoystickSelect}
					/>
				}
				{ this.zoneSelectionMode && <ButtonBar buttons={buttons} /> }
			</Screen>
		);
	}
}


StudyScreen.propTypes = {
	map: PropTypes.object,
	dispatch: PropTypes.func,
};


const mapStateToProps = (state) => {
	return {
		map: state.map,
	};
};

export default connect(mapStateToProps)(StudyScreen);
