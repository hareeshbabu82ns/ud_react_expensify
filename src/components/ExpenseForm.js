import React from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100.0).toString() : "",
      createdAt: moment(props.expense ? props.expense.createdAt : new Date()),
      createdAtFocused: false,
      error: ""
    };
  }
  onElementChange = e => {
    const st = {};
    st[e.target.name] = e.target.value;
    if (e.target.name === "amount") {
      //for special input validation
      if (e.target.value && !e.target.value.match(/^\d{1,}(\.\d{0,2})?$/))
        return;
    }
    this.setState(() => st);
  };
  onCreatedAtChanged = createdAt => {
    // console.log(createdAt.format("MMM Do, YYYY"));
    if (createdAt) this.setState(() => ({ createdAt }));
  };
  onCreatedAtFocused = ({ focused }) => {
    this.setState(() => ({ createdAtFocused: focused }));
  };
  onSubmit = e => {
    e.preventDefault();
    const error =
      this.state.description && this.state.amount
        ? ""
        : "Please provide Expense Description & Amount";
    this.setState(() => ({ error }));
    if (!error) {
      //prepare expense and propagate to parent
      const expense = {
        description: this.state.description,
        note: this.state.note,
        amount: Number(this.state.amount) * 100,
        createdAt: this.state.createdAt.valueOf()
      };
      this.props.onSubmit(expense);
    }
  };
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              autoFocus
              value={this.state.description}
              onChange={this.onElementChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Amount"
              value={this.state.amount}
              onChange={this.onElementChange}
              name="amount"
            />
          </div>
          <div className="form-group">
            <SingleDatePicker
              className="form-control"
              date={this.state.createdAt}
              onDateChange={this.onCreatedAtChanged}
              focused={this.state.createdAtFocused}
              onFocusChange={this.onCreatedAtFocused}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Notes"
              value={this.state.note}
              name="note"
              rows="5"
              onChange={this.onElementChange}
            />
          </div>
          <button className="btn btn-primary">Add Expense</button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
