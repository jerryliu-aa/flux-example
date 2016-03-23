import React from 'react';
import { connect } from 'react-redux';
import CountryPicker from '../../ui-components/country-picker';
import CountryPickerModel from '../../model/country-picker';

var RealCountryPicker = connect(
  (state) => {
    return {
      selectedPanel: CountryPickerModel.getters.shownPanel(state),
      allCountries: CountryPickerModel.getters.allCountries(state),
      popularCountryIds: CountryPickerModel.getters.popularCountries(state),
      selectedCountryIds: CountryPickerModel.getters.selectedCountryIds(state),
    };
  },
  (dispatch) => {
    return {
      onPopularChecked: () => {
        dispatch(CountryPickerModel.actions.switchPanel('popular'));
      },
      onAllCountriesChecked: () => {
        dispatch(CountryPickerModel.actions.switchPanel('all'));
      },
      onCountrySelected: (id) => {
        dispatch(CountryPickerModel.actions.selectContry(id));
      },
      onCountryDeselected: (id) => {
        dispatch(CountryPickerModel.actions.deselectContry(id));
      },
      onCountryToggled: (id) => {
        dispatch(CountryPickerModel.actions.toggleCountry(id));
      },
    };
  }
)(CountryPicker);

// var Label = ({label}) => (<label>{label}</label>);
var RealLabel = connect(
  (state) => ({
    label: CountryPickerModel.getters.selectedCountryNames(state).join(', ') || 'Nothing selected.',
  }),
  () => ({})
)(({label}) => (<label>{label}</label>));

const Home = () => (
  <div><RealLabel /><RealCountryPicker /></div>
);

module.exports = Home;
