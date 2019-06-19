import CONSTS from '../constants';

const initial = {
	zones: null,
	points: null,
	lock: true,
	track: true,
	zoom: 17,
};

export default function map(state = initial, action) {
	switch (action.type) {
	case 'SET_ZONES':
		return {
			...state,
			zones: [CONSTS.MOCKS.POLYGON],
			points: CONSTS.MOCKS.POINTS,
			lock: false,
			track: false,
		};
	case 'RESET_MAP':
		return initial;
	default:
		return state;
	}
}
