import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import CONSTS from '../constants';

const styles = StyleSheet.create({
	container: {
		padding: 25,
	},
	title: {
		color: CONSTS.COLORS.WHITE,
		fontSize: 35,
		fontFamily: 'sans-serif-thin',
		marginBottom: 10,
	},
	input: {
		fontSize: 20,
		color: CONSTS.COLORS.WHITE,
		borderBottomColor: CONSTS.COLORS.WHITE,
	},
});

export default class Card extends Component {
	constructor() {
		super();

		this.renderForm = this.renderForm.bind(this);
		this.state = {
			text: '',
		};
	}

	renderForm() {
		return (
			<View>
				<TextInput
					multiline
					numberOfLines={10}
					underlineColorAndroid={'white'}
					style={styles.input}
					onChangeText={text => this.setState({ text })}
					value={this.state.text}
					tintColor={'red'}
				/>
			</View>
		);
	}

	render() {
		return (
			<TouchableOpacity
				disabled={this.props.opened}
				style={[styles.container, this.props.style]}
				onPress={() => this.props.onPress(this.props.index)}
			>
				<View>
					<Text style={styles.title}>{ this.props.title }</Text>
					{ this.props.opened && this.renderForm() }
				</View>
			</TouchableOpacity>
		);
	}
}


Card.propTypes = {
	index: PropTypes.number,
	opened: PropTypes.bool,
	style: View.propTypes.style,
	onPress: PropTypes.func,
	title: PropTypes.string,
};
