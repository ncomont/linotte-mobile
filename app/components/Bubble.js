import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import CONSTS from '../constants';


const styles = StyleSheet.create({
	bubble: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: CONSTS.SIZES.DEFAULT_BUBBLE_DIAMETER,
		height: CONSTS.SIZES.DEFAULT_BUBBLE_DIAMETER,
		borderRadius: CONSTS.SIZES.DEFAULT_BUBBLE_DIAMETER / 2,
		backgroundColor: CONSTS.COLORS.WHITE,
	},
});


export default class Bubble extends Component {
	render() {
		const diameter = this.props.diameter || CONSTS.SIZES.DEFAULT_BUBBLE_DIAMETER;
		const style = {
			width: diameter,
			height: diameter,
			borderRadius: diameter / 2,
		};

		return (
			<View style={[styles.bubble, this.props.style, style]}>
				{ this.props.children }
			</View>
		);
	}
}


Bubble.propTypes = {
	style: View.propTypes.style,
	diameter: PropTypes.number,
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element),
	]),
};
