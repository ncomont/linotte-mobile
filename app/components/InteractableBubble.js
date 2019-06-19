import React, { Component } from 'react';
import Interactable from 'react-native-interactable';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Bubble } from './';

const STATES = {
	START: 'start',
	END: 'end',
};


export default class InteractableBubble extends Component {
	constructor() {
		super();
		this.ref = null;
	}

	onDragEvent(event) {
		const native = event.nativeEvent;
		switch (native.state) {
		case STATES.START:
			this.props.onDragStart({ x: native.x, y: native.y });
			break;
		case STATES.END:
			this.props.onDragStop({ x: native.x, y: native.y });
		}
	}

	reset() {
		if (this.ref) {
			this.ref.snapTo({ index: 0 });
		}
	}

	render() {
		return (
			<Interactable.View
				style={{ position: 'absolute' }}
				onDrag={event => this.onDragEvent(event)}
				onSnap={event => this.props.onSnap(event.nativeEvent)}
				snapPoints={[{
					x: 0,
					y: 0,
					tension: 500,
					damping: 0.9,
				}].concat(this.props.snapPoints)}
				initialPosition={{
					x: 0,
					y: 0,
				}}
				ref={(ref) => {
					this.ref = ref;
				}}
			>
				<TouchableOpacity onPress={this.props.onPress}>
					<Bubble
						style={this.props.style}
						diameter={this.props.diameter}
					/>
				</TouchableOpacity>
			</Interactable.View>
		);
	}
}


InteractableBubble.propTypes = {
	style: View.propTypes.style,
	diameter: PropTypes.number,
	onPress: PropTypes.func,
	onDragStart: PropTypes.func,
	onDragStop: PropTypes.func,
	onSnap: PropTypes.func,
	snapPoints: PropTypes.arrayOf(
		PropTypes.shape({
			x: PropTypes.number,
			y: PropTypes.number,
		})
	),
};
