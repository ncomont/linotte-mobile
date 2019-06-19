import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	overlay: {
		display: 'flex',
		width: '100%',
		height: '100%',
		backgroundColor: 'black',
	},
});

export default class AnimatedOverlay extends Component {
	constructor(props) {
		super(props);
		this.fadeAnimation = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(
			this.fadeAnimation,
			{
				toValue: 0.7,
				duration: 600,
			}
		).start();
	}

	render() {
		return (
			<View style={styles.container}>
				<Animated.View
					style={[styles.overlay, this.props.style, { opacity: this.fadeAnimation }]}
				/>
				{ this.props.children }
			</View>
		);
	}
}


AnimatedOverlay.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element),
	]),
	style: View.propTypes.style,
};
