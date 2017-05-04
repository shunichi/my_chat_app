import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ScheduleEvent from './schedule_event';
import ScheduleTableCell from './schedule_table_cell';
import moment from 'moment';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class ScheduleTable extends React.Component {

  momentize(event) {
    return Object.assign({}, event, {beginAt: moment(event.beginAt), endAt: moment(event.endAt)});
  };

  buildCell(columIndex, rowIndex) {
    return (<ScheduleTableCell
      key={rowIndex}
      beginAt={moment(this.props.tableBeginAt).add(rowIndex, 'hours')}
      columnIndex={columIndex}
      dispatch={this.props.dispatch}
    />);
  }

  render() {
    const columnSize = this.props.columnSize;
    const rowSize = 10;
    const headers = _.range(columnSize).map(index => <th key={index} className="schedule-table__th">{index}</th>);
    const columns = _.range(columnSize).map(columnIndex => {
      const rows = _.range(rowSize).map(rowIndex => this.buildCell(columnIndex, rowIndex));
      const eventComponents = this.props.events.filter(event => event.columnIndex === columnIndex).map((event) => {
          return (<ScheduleEvent key={event.id} tableBeginAt={this.props.tableBeginAt} event={event} />);
      });
      return (<td key={columnIndex} className="schedule-table__cells">{rows}{eventComponents}</td>);
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
  dispatch: PropTypes.func.isRequired,
  columnSize: PropTypes.number.isRequired,
  tableBeginAt: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
};

export default DragDropContext(HTML5Backend)(ScheduleTable);
