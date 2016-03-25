import { createStore } from 'redux';
import { createSelector } from 'reselect';
import keyMirror from 'keyMirror';
import Immutable from 'immutable';
import countries from './countries';

function getDefaultPopular(allCountries) {
  return allCountries.map((country, index) => {
    country.id = index;
    return country;
  })
  .filter((country) => country.id % 3 === 0 )
  .map(country => country.id);
}

module.exports.defaultState = Immutable.fromJS({
  allCountries: countries, // array of object
  popularCountries: Immutable.Set(getDefaultPopular(countries)),
  selectedCountryIds: Immutable.Set([]),
  shownPanel: 'popular' // all or popular
});

const ACTIONS = {
  'SELECT_COUNTRY': {
    type: 'SELECT_COUNTRY',
    countryId: NaN
  },
  'DESELECT_COUNTRY': {
    type: 'DESELECT_COUNTRY',
    countryId: NaN
  },
  'TOGGLE_COUNTRY': {
    type: 'TOGGLE_COUNTRY',
    countryId: NaN
  },

  'SWITCH_PANEL': {
    type: 'SWITCH_PANEL',
    'target': 'all'
  },
};

module.exports.actions = {
  selectContry: (countryId) => {
    return {
      type: ACTIONS.SELECT_COUNTRY.type,
      countryId: countryId
    };
  },

  deselectContry: (countryId) => {
    return {
      type: ACTIONS.DESELECT_COUNTRY.type,
      countryId: countryId
    };
  },

  toggleCountry: (countryId) => {
    return {
      type: ACTIONS.TOGGLE_COUNTRY.type,
      countryId: countryId
    };
  },

  switchPanel: (target) => {
    return {
      type: ACTIONS.SWITCH_PANEL.type,
      target: target
    };
  },
}

module.exports.countryPicker = function(state, action) {
  var newState = state;
  switch (action.type) {
    case ACTIONS.SELECT_COUNTRY.type:
      newState = state.updateIn(['selectedCountryIds'],
      (selectedCountryIds) => {
        return selectedCountryIds.add(action.countryId);
      });
      break;
    case ACTIONS.DESELECT_COUNTRY.type:
      newState = state.updateIn(['selectedCountryIds'],
      (selectedCountryIds) => {
        return selectedCountryIds.delete(action.countryId);
      });
      break;
    case ACTIONS.TOGGLE_COUNTRY.type:
      newState = state.updateIn(['selectedCountryIds'],
      (selectedCountryIds) => {
        if(selectedCountryIds.has(action.countryId)){
          return selectedCountryIds.delete(action.countryId);
        }
        return selectedCountryIds.add(action.countryId);
      });
      break;
    case ACTIONS.SWITCH_PANEL.type:
      newState = state.set('shownPanel', action.target);
      break;
    default:
  }

  return newState;
}

module.exports.getters = {
  shownPanel: (state) => {
    return state.get('shownPanel');
  },
  allCountries: (state) => {
    return state.get('allCountries').toJS();
  },
  popularCountries: (state) => {
    return state.get('popularCountries').toJS();
  },
  selectedCountryIds: (state) => {
    return state.get('selectedCountryIds').toJS();
  },
  selectedCountryNames: (state) => {
    var names = state.get('selectedCountryIds').map((id) => {
      return state.getIn(['allCountries', id, 'name']);
    }).toJS();
    .join(', ');
  }
}
