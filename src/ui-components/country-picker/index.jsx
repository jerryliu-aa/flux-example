import React from 'react';
import classnames from 'classnames';

var cx = classnames;

require('./_style.scss');

var DEFAULT_COUNTRY_LIST = [{name: 'Test'}];

function calcPopularCountries(allCountries, popularCountryIds) {
  return allCountries
  .map((country, index) => {
    return {
      id: index,
      name: country.name
    };
  })
  .filter((country) => {
    return popularCountryIds.indexOf(country.id) !== -1;
  });
}

var CountryPicker = ({
  allCountries,
  popularCountryIds,
  selectedCountryIds,
  selectedPanel,

  onPopularChecked,
  onAllCountriesChecked,

  onCountrySelected,
  onCountryDeselected,
  onCountryToggled,
}) => {
  return (
    <div className="country-picker component">
      <div className="panel-picker">
        <div
          className={cx({
            selected: selectedPanel === 'popular'
          })}
          onClick={onPopularChecked}>Most Popular</div>
        <div
          className={cx({
            selected: selectedPanel === 'all'
          })}
          onClick={onAllCountriesChecked}>All Countries</div>
      </div>
      <div className="panel-container">
        <ul className={cx("panel", {
          selected: selectedPanel === 'popular'
        })}>
          {calcPopularCountries(allCountries, popularCountryIds).map((country) => {
            return (<li
              className={cx("counry-item", {
                selected: selectedCountryIds.indexOf(country.id) !== -1
              })}
              title={country.name}
              onClick={onCountryToggled.bind(null, country.id)}
              key={country.name}>{country.name}</li>);
          })}
        </ul>
        <ul className={cx("panel", {
          selected: selectedPanel === 'all'
        })}>
        {allCountries.map((country, index) => {
          return (<li
            className={cx("counry-item", {
              selected: selectedCountryIds.indexOf(index) !== -1
            })}
            onClick={onCountryToggled.bind(null, index)}
            title={country.name}
            key={country.name}>{country.name}</li>);
        })}
        </ul>
      </div>
    </div>
  );
};

CountryPicker.propTypes = {
  allCountries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  popularCountryIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  selectedCountryIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  selectedPanel: React.PropTypes.string.isRequired,

  onPopularChecked: React.PropTypes.func,
  onAllCountriesChecked: React.PropTypes.func,

  onCountrySelected: React.PropTypes.func,
  onCountryDeselected: React.PropTypes.func,
  onCountryToggled: React.PropTypes.func,
};

CountryPicker.defaultProps = {
  allCountries: DEFAULT_COUNTRY_LIST,
  popularCountryIds: [0],
  selectedCountryIds: [],
  selectedPanel: 'popular',

  onPopularChecked: () => {},
  onAllCountriesChecked: () => {},

  onCountrySelected: () => {},
  onCountryDeselected: () => {},
  onCountryToggled: () => {},
};

module.exports = CountryPicker;
