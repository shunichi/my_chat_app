import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ScheduleEvent from './schedule_event';
import moment from 'moment';

export default class ScheduleTable extends React.Component {

  momentize(event) {
    return Object.assign({}, event, {beginAt: moment(event.beginAt), endAt: moment(event.endAt)});
  };

  render() {
    const tableBeginAt = moment('8:00', 'HH:mm');
    const columnSize = this.props.columnSize;
    const rowSize = 10;
    const headers = _.range(columnSize).map(index => <th key={index} className="schedule-table__th">{index}</th>);
    const columns = _.range(columnSize).map(index => {
      const rows = _.range(rowSize).map(index => <div key={index} className="schedule-table__cell" />);
      const eventComponents = this.props.events.filter(event => event.columnIndex === index).map((event) => {
          return (<ScheduleEvent key={event.id} tableBeginAt={tableBeginAt} event={this.momentize(event)} />);
      });
      console.log(eventComponents);
      return (<td key={index} className="schedule-table__cells">{rows}{eventComponents}</td>);
    });

    return (
      <table className="schedule-table">
        <thead><tr className="schedule-table__header">{headers}</tr></thead>
        <tbody><tr className="schedule-table__row">{columns}</tr></tbody>
      </table>
    );
  }
}


ScheduleTable.propTypes = {
  columnSize: PropTypes.number.isRequired,
  events: PropTypes.array.isRequired,
};
