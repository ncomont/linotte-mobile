import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
	container: {
		display: 'flex',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});


export default class Screen extends Component {
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				{ this.props.children }
			</View>
		);
	}
}


Screen.propTypes = {
	children: PropTypes.any, // eslint-disable-line
	style: View.propTypes.style,
};
