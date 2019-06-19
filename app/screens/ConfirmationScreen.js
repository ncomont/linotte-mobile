import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import {
	AnimatedOverlay,
	ButtonType,
	ButtonBar,
} from '../components';
import Screen from './Screen';


const styles = StyleSheet.create({
	confirmation: {
		flex: 1,
		top: '20%',
		width: '100%',
		height: '100%',
		position: 'absolute',
		alignItems: 'center',
	},
});


export default class ConfirmationScreen extends PureComponent {
	render() {
		const buttons = [
			{
				key: ButtonType.CANCEL,
				action: () => {
					if (this.props.dismissAction) {
						this.props.dismissAction();
					}
				},
			},
			{
				key: ButtonType.CONTINUE,
				action: () => {
					if (this.props.confirmAction) {
						this.props.confirmAction();
					}
				},
			},
		];

		return (
			<Screen>
				<AnimatedOverlay>
					<View style={styles.confirmation}>
						{ this.props.children }
					</View>
					<ButtonBar buttons={buttons} />
				</AnimatedOverlay>
			</Screen>
		);
	}
}

ConfirmationScreen.propTypes = {
	children: PropTypes.any, // eslint-disable-line
	dismissAction: PropTypes.func,
	confirmAction: PropTypes.func.isRequired,
};
