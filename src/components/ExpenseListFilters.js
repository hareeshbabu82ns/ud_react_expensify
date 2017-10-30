import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";

import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../actions/filters";

class ExpenseListFilters extends React.Component {
  state = {
    dateFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };
  onFocusChange = dateFocused => {
    this.setState(() => ({ dateFocused }));
  };
  render() {
    return (
      <form className="form-inline" onSubmit={e => e.preventDefault()}>
        <div className="form-group mx-sm-3">
          <input
            type="text"
            className="form-control"
            value={this.props.filters.text}
            onChange={e => this.props.dispatch(setTextFilter(e.target.value))}
          />
        </div>
        <div className="form-group mx-sm-3">
          <select
            value={this.props.filters.sortBy}
            className="form-control"
            onChange={e =>
              this.props.dispatch(
                e.target.value === "date" ? sortByDate() : sortByAmount()
              )}
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
export default connect(mapStateToProps)(ExpenseListFilters);
