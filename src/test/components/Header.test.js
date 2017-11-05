import React from "react";
import { shallow } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
// import toJSON from 'enzyme-to-json';

// import ReactShallowRenderer from "react-test-renderer/shallow";

import Header from "../../components/Header";

const createMockStore = configureMockStore([thunk]);

test("should render Header", () => {
  const store = createMockStore({ auth: { uid: "333" } });
  const wrapper = shallow(<Header store={store} />);
  expect(wrapper).toMatchSnapshot();
  // expect(toJSON(wrapper)).toMatchSnapshot();
  // expect(wrapper.find("h1").text()).toBe("Expensify");
  // expect(wrapper.find("h1").length).toBe(1);

  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});
