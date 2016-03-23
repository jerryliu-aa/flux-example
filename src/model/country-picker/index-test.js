var expect = require('expect');
var Immutable = require('immutable');
var sources = require('./');

describe("actions", function() {

  it("should generate an action to select country by countryId", function() {
    const countryId = 0;
    const expectedAction = {
      type: 'SELECT_COUNTRY',
      countryId: countryId
    }
    expect(sources.actions.selectContry(countryId))
    .toEqual(expectedAction);
  });

});

describe("getters", function() {

  it("should return shownPanel correctly", function() {
    var state = sources.countryPicker(sources.defaultState, {});
    expect(
      sources.getters.shownPanel(state)
    ).toEqual('popular');
  });

});

describe("reducers", function() {

  it("should return a valid initial state", function() {
    var state = sources.countryPicker(sources.defaultState, {});
    expect(
      state.get('shownPanel')
    ).toEqual('popular');
  });

  it("should be able to select 'all' panel", function() {
    var state = sources.countryPicker(sources.defaultState, {});
    state = sources.countryPicker(state, sources.actions.switchPanel('all'));

    expect(
      state.get('shownPanel')
    ).toEqual('all');
  })

});
