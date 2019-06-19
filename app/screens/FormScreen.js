import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import { Card } from '../components';
import CONSTS from '../constants';


export default class FormScreen extends Component {
	constructor() {
		super();
		this.state = {
			entries: [...CONSTS.MOCKS.FORM],
		};
		this.toggle = this.toggle.bind(this);
		this.renderCard = this.renderCard.bind(this);
	}

	toggle(index) {
		this.setState({
			entries: this.state.entries.map((entry) => {
				return {
					...entry,
					isOpened: entry.id === index ? !entry.isOpened : false,
				};
			}),
		});
	}

	renderCard(entry, index) {
		const style = {
			backgroundColor: CONSTS.COLORS.MAP[index % CONSTS.COLORS.MAP.length],
			elevation: this.state.entries.length - index,
		};

		return (
			<Card
				key={index}
				index={index}
				style={style}
				title={entry.title}
				opened={entry.isOpened}
				onPress={this.toggle}
			/>
		);
	}

	render() {
		return (
			<ScrollView>
				{ this.state.entries.map((entry, index) => this.renderCard(entry, index)) }
			</ScrollView>
		);
	}
}


FormScreen.navigatorStyle = {
	navBarTextColor: CONSTS.COLORS.WHITE,
	navBarButtonColor: CONSTS.COLORS.WHITE,
	navBarBackgroundColor: CONSTS.COLORS.ANDROID_GREEN,
};
