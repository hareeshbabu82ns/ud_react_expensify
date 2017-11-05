import moment from "moment";

const expenses = [
  {
    id: "1",
    description: "Rent",
    note: "",
    amount: 10000,
    createdAt: moment(0)
      .subtract(4, "day")
      .valueOf()
  },
  {
    id: "2",
    description: "Electricity",
    note: "",
    amount: 5000,
    createdAt: moment(0).valueOf()
  },
  {
    id: "3",
    description: "Gas",
    note: "",
    amount: 20000,
    createdAt: moment(0)
      .add(4, "day")
      .valueOf()
  }
];

export default expenses;
