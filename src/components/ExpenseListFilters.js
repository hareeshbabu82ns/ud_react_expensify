import React from "react";
import { connect } from "react-redux";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";

import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../actions/filters";

export class ExpenseListFilters extends React.Component {
  state = {
    dateFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = dateFocused => {
    this.setState(() => ({ dateFocused }));
  };
  onTextChange = e => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = e => {
    e.target.value === "date"
      ? this.props.sortByDate()
      : this.props.sortByAmount();
  };
  render() {
    return (
      <form className="form-inline" onSubmit={e => e.preventDefault()}>
        <div className="form-group mx-sm-3">
          <input
            type="text"
            className="form-control"
            value={this.props.filters.text}
            onChange={this.onTextChange}
          />
        </div>
        <div className="form-group mx-sm-3">
          <select
            value={this.props.filters.sortBy}
            className="form-control"
            onChange={this.onSortChange}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
        <div className="form-group">
          <DateRangePicker
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.dateFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            showClearDates={true}
            isOutsideRange={() => false}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({ filters: state.filters });
const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: date => dispatch(setStartDate(date)),
  setEndDate: date => dispatch(setEndDate(date))
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
