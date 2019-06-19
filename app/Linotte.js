import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { registerScreens } from './screens';
import AppReducer from './reducers';
import CONSTS from './constants';

registerScreens(
	createStore(AppReducer),
	Provider,
);

export default class Linotte extends Component {
	constructor() {
		super();
		const { height, width } = Dimensions.get('window');

		global.SCREEN_SIZE = {
			WIDTH: width,
			HEIGHT: height,
		};
		global.SCREEN_CENTER = {
			X: width / 2,
			Y: (height / 2) - (StatusBar.currentHeight / 2),
		};
	}

	start() {
		Navigation.startSingleScreenApp({
			screen: {
				screen: CONSTS.SCREENS.STUDY,
				title: CONSTS.STRINGS.SCREENS[CONSTS.SCREENS.STUDY],
				navigatorStyle: {
					navBarHidden: true,
				},
			},
		});
	}
}
