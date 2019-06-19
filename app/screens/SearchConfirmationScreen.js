import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import CONSTS from '../constants';
import ConfirmationScreen from './ConfirmationScreen';
import { Button, ButtonType } from '../components';


const styles = StyleSheet.create({
	photobutton: {
		width: 260,
		height: 70,
		borderWidth: 1,
		borderColor: CONSTS.COLORS.WHITE,
	},
	text: {
		color: 'white',
		textAlign: 'center',
	},
	taxon: {
		width: '95%',
		marginBottom: 120,
	},
	name: {
		fontSize: 28,
		fontStyle: 'italic',
	},
	author: {
		fontSize: 10,
		marginTop: 10,
	},
	vernacularname: {
		fontSize: 18,
	},
});


export default class SearchConfirmationScreen extends PureComponent {
	render() {
		const taxon = this.props.taxon;
		const actions = {
			confirm: () => {
				this.props.navigator.dismissModal();
				this.props.navigator.push({
					screen: CONSTS.SCREENS.FORM,
					title: CONSTS.STRINGS.SCREENS.FORM,
				});
			},
			dismiss: this.props.navigator.dismissModal,
		};

		return (
			<ConfirmationScreen
				style={styles.confirmation}
				confirmAction={actions.confirm}
				dismissAction={actions.dismiss}
				navigator={this.props.navigator}
			>
				<View style={styles.taxon}>
					<Text style={[styles.text, styles.name]}>{ taxon.name }</Text>
					<Text style={[styles.text, styles.vernacularname]}>{ taxon.vernacularName }</Text>
					<Text style={[styles.text, styles.author]}>{ taxon.author }</Text>
				</View>
				<Button
					style={styles.photobutton}
					text={CONSTS.STRINGS.BUTTONS.PHOTO}
					type={ButtonType.PHOTO}
				/>
			</ConfirmationScreen>
		);
	}
}

SearchConfirmationScreen.propTypes = {
	navigator: PropTypes.object.isRequired,
	taxon: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		author: PropTypes.string,
		vernacularName: PropTypes.string,
	}),
};
