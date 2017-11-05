import React from "react";
import { shallow } from "enzyme";
import moment from "moment";

import { ExpenseForm } from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("should render ExpenseForm with default values", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with values", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should throw error on submit", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", { preventDefault: () => {} });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should update state on description change", () => {
  const value = "some description";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input[name='description']")
    .simulate("change", { target: { name: "description", value } });
  expect(wrapper.state("description")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should update state on amount change", () => {
  const value = "33300";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input[name='amount']")
    .simulate("change", { target: { name: "amount", value } });
  expect(wrapper.state("amount")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should not update state on invalid amount change", () => {
  const value = "33ii300";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input[name='amount']")
    .simulate("change", { target: { name: "amount", value } });
  expect(wrapper.state("amount")).not.toBe(value);
  expect(wrapper.state("amount")).toBe("");
  expect(wrapper).toMatchSnapshot();
});

test("should update date on change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("withStyles(SingleDatePicker)").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toBe(now);
});

test("should call onSubmit with valid params", () => {
  const onSubmitSpy = jest.fn();
  const value = "some description";
  const wrapper = shallow(
    <ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} />
  );
  wrapper
    .find("input[name='description']")
    .simulate("change", { target: { name: "description", value } });
  wrapper.find("form").simulate("submit", { preventDefault: () => {} });
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: value,
    note: expenses[1].note,
    amount: expenses[1].amount,
    createdAt: expenses[1].createdAt
  });
});
