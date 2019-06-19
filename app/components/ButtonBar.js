import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { Button } from './';
import CONSTS from '../constants';

const style = StyleSheet.create({
	container: {
		width: '100%',
		height: 70,
		bottom: 0,
		position: 'absolute',
		flexDirection: 'row',
	},
});

export default class ButtonBar extends Component {
	renderButton(button) {
		return (
			<Button
				key={button.key}
				type={button.key}
				style={{ flex: 1 }}
				action={button.action}
				text={CONSTS.STRINGS.BUTTONS[button.key]}
			/>
		);
	}

	render() {
		return (
			<View style={style.container}>
				{ this.props.buttons.map(button => this.renderButton(button)) }
			</View>
		);
	}
}


ButtonBar.propTypes = {
	buttons: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			action: PropTypes.func,
		}),
	),
};
