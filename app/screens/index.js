import { Navigation } from 'react-native-navigation';

import FormScreen from './FormScreen';
import StudyScreen from './StudyScreen';
import SearchConfirmationScreen from './SearchConfirmationScreen';
import ZoneConfirmationScreen from './ZoneConfirmationScreen';

import CONSTS from '../constants';

export function registerScreens(store, Provider) {
	Navigation.registerComponent(CONSTS.SCREENS.FORM, () => FormScreen, store, Provider);
	Navigation.registerComponent(CONSTS.SCREENS.STUDY, () => StudyScreen, store, Provider);
	Navigation.registerComponent(CONSTS.SCREENS.SEARCH_CONFIRMATION, () => SearchConfirmationScreen, store, Provider);
	Navigation.registerComponent(CONSTS.SCREENS.ZONE_CONFIRMATION, () => ZoneConfirmationScreen, store, Provider);
}
