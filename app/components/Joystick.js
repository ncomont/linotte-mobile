import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';

import {
	Bubble,
	InteractableBubble,
} from './';
import CONSTS from '../constants';


const styles = StyleSheet.create({
	default: {
		display: 'flex',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: CONSTS.COLORS.WHITE,
	},
	group: {
		position: 'absolute',
	},
	joystick: {
		borderWidth: 4,
		borderColor: CONSTS.COLORS.WHITE,
		backgroundColor: CONSTS.COLORS.ANDROID_GREEN,
	},
});


export default class Joystick extends Component {
	constructor() {
		super();

		this.onSnap = this.onSnap.bind(this);
		this.onDragStop = this.onDragStop.bind(this);
		this.onDragStart = this.onDragStart.bind(this);

		this.state = {
			moving: false,
			options: [],
		};
	}

	componentWillMount() {
		this.setState((state) => {
			return {
				...state,
				moving: false,
				options: this.props.options.map((group, index) => {
					return {
						...group,
						...this.computeCoordinates(index, this.props.options.length),
						color: CONSTS.COLORS.MAP[index % CONSTS.COLORS.MAP.length],
					};
				}),
			};
		});
	}

	onDragStart() {
		this.setState((state) => {
			return {
				...state,
				moving: true,
			};
		});
	}

	onDragStop() {
		this.setState((state) => {
			return {
				...state,
				moving: false,
			};
		});
	}

	onSnap(point) {
		if (point.id) {
			this.props.onSelect(point);
		}
	}

	computeCoordinates(index, count) {
		const angle = (2 * Math.PI) / count;
		const radius = CONSTS.SIZES.GROUPS_CIRCLE_RADIUS;
		const bubbleRadius = CONSTS.SIZES.GROUP_BUBBLE_DIAMETER / 2;

		return {
			x: (global.SCREEN_CENTER.X - bubbleRadius) + (radius * Math.cos(index * angle)),
			y: (global.SCREEN_CENTER.Y - bubbleRadius) + (radius * Math.sin(index * angle)),
		};
	}

	transposeOptionCoordinates(group) {
		const radius = CONSTS.SIZES.GROUP_BUBBLE_DIAMETER / 2;

		return {
			...group,
			x: (group.x - global.SCREEN_CENTER.X) + radius,
			y: (group.y - global.SCREEN_CENTER.Y) + radius,
		};
	}

	renderOption(group, index) {
		const style = {
			top: group.y,
			left: group.x,
			backgroundColor: group.color,
		};

		return (
			<Bubble
				style={[styles.group, style]}
				diameter={CONSTS.SIZES.GROUP_BUBBLE_DIAMETER}
				key={index}
			>
				<Text style={styles.text}>{ group.name }</Text>
			</Bubble>
		);
	}

	renderOptions() {
		const animation = new Animated.Value(0);
		Animated.timing(
			animation,
			{
				toValue: 1,
				duration: 300,
			}
		).start();

		return (
			<Animated.View
				style={[styles.default, { opacity: animation, transform: [{ scale: animation }] }]}
			>
				{ this.state.moving && this.state.options.map(this.renderOption) }
			</Animated.View>
		);
	}

	render() {
		return (
			<View style={styles.default}>
				{ this.state.moving && this.renderOptions() }
				<InteractableBubble
					onDragStart={this.onDragStart}
					onDragStop={this.onDragStop}
					onSnap={this.onSnap}
					style={styles.joystick}
					snapPoints={this.state.options.map(this.transposeOptionCoordinates)}
					diameter={CONSTS.SIZES.JOYSTICK_DIAMETER}
				/>
			</View>
		);
	}
}


Joystick.propTypes = {
	map: PropTypes.object,
	onSelect: PropTypes.func,
	options: PropTypes.arrayOf(
		PropTypes.shape({ id: PropTypes.string })
	),
};
