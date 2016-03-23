var React = require('react');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');

var CountryPicker = require('./');

function wrap(statelessComponent) {
  return React.createClass({
    render: function() {
      return statelessComponent(this.props);
    }
  });
}

var WrappedCountryPicker = wrap(CountryPicker);

describe("CountryPicker", function() {

  it("should properly be rendered", function() {
    var elm = <WrappedCountryPicker
      allCountries={[{name: 'ABC'}]}
      popularCountryIds={[0]}
      selectedCountryIds={[]}
      selectedPanel="popular"
      onPopularChecked={() => {}}
      onAllCountriesChecked={() => {}}

      onCountrySelected={() => {}}
      onCountryDeselected={() => {}}
      onCountryToggled={() => {}}
       />;

    expect(TestUtils.isElement(elm)).toBe(true);
    var comp = TestUtils.renderIntoDocument(elm);
    comp = TestUtils.findRenderedDOMComponentWithClass(comp, 'country-picker');
    expect(TestUtils.isDOMComponent(comp)).toBe(true);
  });
});
