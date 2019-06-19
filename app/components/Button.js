import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import CONSTS from '../constants';

const style = StyleSheet.create({
	button: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
	BACK: {
		backgroundColor: CONSTS.COLORS.CANCEL,
	},
	CANCEL: {
		backgroundColor: CONSTS.COLORS.CANCEL,
	},
	CONTINUE: {
		backgroundColor: CONSTS.COLORS.CONFIRM,
	},
	PHOTO: {
		backgroundColor: CONSTS.COLORS.BLACK,
	},
});

export const ButtonType = {
	CANCEL: 'CANCEL',
	CONTINUE: 'CONTINUE',
	PHOTO: 'PHOTO',
	BACK: 'BACK',
};

export class Button extends Component {
	render() {
		return (
			<TouchableOpacity style={this.props.style} onPress={this.props.action}>
				<View style={[style.button, style[this.props.type]]}>
					<Text style={style.text}>{ this.props.text.toUpperCase() }</Text>
				</View>
			</TouchableOpacity>
		);
	}
}


Button.propTypes = {
	style: View.propTypes.style,
	text: PropTypes.string,
	type: PropTypes.string,
	action: PropTypes.func,
};
