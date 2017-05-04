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

  componentWillMount() {
    if (typeof App !== 'undefined') {
      App.schedule = App.cable.subscriptions.create("ScheduleChannel", {
        connected: () => {},
        disconnected: () => {},
        received: (data) => {
          this.updateEvent(data['event']);
        },
        update_event: function (event) {
          const eventData = { id: event.id, begin_at: event.beginAt, column_index: event.columnIndex };
          return this.perform('update_event', {event: eventData});
        },
      });
    }
  }

  componentDidMount() {
    this.subscribe({
      dropEvent: this.handleDropEvent,
    });
  }

  updateEvent({id, beginAt, columnIndex}) {
    const newEvents = this.state.events.map((event) => {
      if (event.id === id) {
        return this.modifyEvent(event, moment(beginAt), columnIndex);
      } else {
        return event;
      }
    });
    this.setState({
      events: newEvents,
    });
  }

  handleDropEvent(event) {
    this.updateEvent(event);
    App.schedule.update_event(event);
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

