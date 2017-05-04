import React from 'react';
import PropTypes from 'prop-types';
import MicroContainer from 'react-micro-container';
import ScheduleTable from '../components/schedules/schedule_table';
import moment from 'moment';

export default class ScheduleTableContainer extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = { events: this.props.events.map(event => this.momentize(event)) };
  }

  componentDidMount() {
    this.subscribe({
      dropEvent: this.handleDropEvent,
    });
  }

  handleDropEvent({id, beginAt, columnIndex}) {
    const newEvents = this.state.events.map((event) => {
      if (event.id === id) {
        return this.modifyEvent(event, beginAt, columnIndex);
      } else {
        return event;
      }
    });
    this.setState({
      events: newEvents,
    });
  }

  modifyEvent (event, beginAt, columnIndex) {
    const durationMinutes = event.endAt.diff(event.beginAt, 'minutes');
    const newEndAt = moment(beginAt).add(durationMinutes, 'minutes');
    return Object.assign({}, event, {columnIndex, beginAt, endAt: newEndAt});
  }

  momentize(event) {
    return Object.assign({}, event, {beginAt: moment(event.beginAt), endAt: moment(event.endAt)});
  };

  render() {
    return (<ScheduleTable columnSize={this.props.columnSize} tableBeginAt={moment(this.props.tableBeginAt, 'HH:mm')} events={this.state.events} dispatch={this.dispatch}/>);
  }
}

ScheduleTableContainer.propTypes = {
  columnSize: PropTypes.number.isRequired,
  tableBeginAt: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
};

