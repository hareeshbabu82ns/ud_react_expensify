import React from "react";
import { shallow } from "enzyme";

import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";

let setTextFilter;
let wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters filters={filters} setTextFilter={setTextFilter} />
  );
});

test("should render ExpenseListFilters properly", () => {
  expect(wrapper).toMatchSnapshot();
});
test("should render ExpenseListFilters with altFilters", () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});
