import React, { Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import CONSTS from '../constants';


const styles = StyleSheet.create({
	map: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
});


export default class Map extends Component {
	constructor() {
		super();

		Mapbox.setAccessToken(
			'SECRET'
		);
	}

	componentWillReceiveProps(next) {
		if (next.zones && next.zones.length) {
			const bounds = this.getPolygonBounds(next.zones[0]);
			const padding = 100;
			this._map.setVisibleCoordinateBounds(
				bounds.latitudeSW,
				bounds.longitudeSW,
				bounds.latitudeNE,
				bounds.longitudeNE,
				padding,
				padding,
				padding,
				padding,
				true
			);
		}
		else if (next.zoom) {
			setTimeout(() => this._map.setZoomLevel(next.zoom), 0);
		}
	}

	getPolygonBounds(polygon) {
		let latitudeSW = 900;
		let longitudeSW = 900;
		let latitudeNE = -900;
		let longitudeNE = -900;

		for (let i = 0; i < polygon.length; i++) {
			latitudeSW = Math.min(latitudeSW, polygon[i][0]);
			longitudeSW = Math.min(longitudeSW, polygon[i][1]);
			latitudeNE = Math.max(latitudeNE, polygon[i][0]);
			longitudeNE = Math.max(longitudeNE, polygon[i][1]);
		}

		return {
			latitudeSW,
			longitudeSW,
			latitudeNE,
			longitudeNE,
		};
	}

	getAnnotations() {
		let annotations = [];

		if (this.props.zones) {
			annotations = this.props.zones.map((z, i) => {
				return {
					coordinates: z,
					type: 'polyline',
					strokeColor: CONSTS.COLORS.RED,
					strokeWidth: 3,
					id: `zone-${i}`,
				};
			});
		}

		if (this.props.points) {
			annotations = annotations.concat(
				this.props.points.map((p, i) => {
					return {
						coordinates: p,
						type: 'point',
						id: `point-${i}`,
						title: `IPA ${i}`,
						subtitle: `This is an example subtitle for IPA ${i}`,
						annotationImage: {
							source: { uri: 'http://via.placeholder.com/25x25' },
							height: 25,
							width: 25,
						},
					};
				})
			);
		}

		return annotations;
	}

	render() {
		const tracking = Mapbox.userTrackingMode[this.props.track ? 'follow' : 'none'];
		return (
			<MapView
				ref={map => this._map = map}
				style={[styles.map, this.props.style]}
				scrollEnabled={!this.props.lock}
				zoomEnabled={!this.props.lock}
				initialZoomLevel={this.props.zoom}
				styleURL={Mapbox.mapStyles.satellite}
				userTrackingMode={tracking}
				rotateEnabled={false}
				pitchEnabled={false}
				attributionButtonIsHidden
				showsUserLocation
				logoIsHidden
				annotations={this.getAnnotations()}
				onRightAnnotationTapped={this.props.onOpenAnnotation}
			/>
		);
	}
}


Map.propTypes = {
	style: View.propTypes.style,
	lock: PropTypes.bool,
	track: PropTypes.bool,
	zoom: PropTypes.number,
	onOpenAnnotation: PropTypes.func,
	zones: PropTypes.arrayOf(
		PropTypes.arrayOf(
			PropTypes.arrayOf(
				PropTypes.number
			)
		)
	),
	points: PropTypes.arrayOf(
		PropTypes.arrayOf(
			PropTypes.number
		)
	),
};
