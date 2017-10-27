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
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={e => this.props.dispatch(setTextFilter(e.target.value))}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={e =>
            this.props.dispatch(
              e.target.value === "date" ? sortByDate() : sortByAmount()
            )}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
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
    );
  }
}

const mapStateToProps = state => ({ filters: state.filters });
export default connect(mapStateToProps)(ExpenseListFilters);
