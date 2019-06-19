import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import ConfirmationScreen from './ConfirmationScreen';


const styles = StyleSheet.create({
	text: {
		color: 'white',
		textAlign: 'center',
	},
	zone: {
		width: '95%',
		marginBottom: 120,
	},
	name: {
		fontSize: 28,
	},
});


export default class ZoneConfirmationScreen extends PureComponent {
	render() {
		const actions = {
			confirm: this.props.navigator.dismissModal,
			dismiss: this.props.navigator.dismissModal,
		};

		return (
			<ConfirmationScreen
				style={styles.confirmation}
				confirmAction={actions.confirm}
				dismissAction={actions.dismiss}
				navigator={this.props.navigator}
			>
				<View style={styles.zone}>
					<Text style={[styles.text, styles.name]}>{ this.props.zone.name }</Text>
				</View>
			</ConfirmationScreen>
		);
	}
}

ZoneConfirmationScreen.propTypes = {
	navigator: PropTypes.object.isRequired,
	zone: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	}),
};
