import React from 'react';
import PropTypes from 'prop-types';
import MicroContainer from 'react-micro-container';
import ScheduleTable from '../components/schedules/schedule_table';
import moment from 'moment';
import humps from 'humps';
import $ from 'jquery';

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
          const action = data.action;
          if (action === 'update') {
            this.updateEvent(this.momentize(humps.camelizeKeys(data.event)));
          } else if (action === 'destroy') {
            this.destroyEvent(data.event.id);
          }
        },
        updateEvent: function (event) {
          const eventData = Object.assign({}, event, {beginAt: event.beginAt.format(), endAt: event.endAt.format()});
          return this.perform('update_event', {event: humps.decamelizeKeys(eventData)});
        },
      });
    }
  }

  componentDidMount() {
    this.subscribe({
      dropEvent: this.handleDropEvent,
      destroyEvent: this.handleDestroyEvent,
    });
  }

  updateEvent(newEvent) {
    let found = false;
    const newEvents = this.state.events.map((event) => {
      if (event.id === newEvent.id) {
        found = true;
        return newEvent;
      } else {
        return event;
      }
    });
    if (!found) {
      newEvents.push(newEvent);
    }
    this.setState({ events: newEvents });
  }

  destroyEvent(id) {
    const newEvents = this.state.events.filter(event => event.id !== id);
    this.setState({ events: newEvents });
  }

  findEvent(id) {
    return this.state.events.find(event => event.id === id);
  }

  handleDropEvent({ id, beginAt, columnIndex }) {
    const targetEvent = this.findEvent(id);
    const duration = targetEvent.endAt.diff(targetEvent.beginAt, 'minutes');
    const newEvent = Object.assign({}, targetEvent, { beginAt, endAt: moment(beginAt).add(duration, 'minutes'), columnIndex });
    this.updateEvent(newEvent);
    App.schedule.updateEvent(newEvent);
  }

  handleDestroyEvent(id) {
    $.ajax({
      url: `/schedule_events/${id}`,
      method: 'DELETE',
      data: {
        authenticity_token: this.props.authenticityToken
      },
    });
    
    // いろいろ試したけど fetch ではうまく動かせなかった
    // const formData = new FormData();
    // const headers = new Headers();
    // formData.append('authenticity_token', this.props.authenticityToken);
    // formData.append('_method', 'delete');
    // // headers.append('X-CSRF-Token', this.props.authenticityToken);
    // headers.append("Content-Type", "application/x-www-form-urlencoded");
    // fetch(`/schedule_events/${id}`, {method: 'POST', headers: headers, body: formData});
  }

  momentize(event) {
    return Object.assign({}, event, {beginAt: moment(event.beginAt), endAt: moment(event.endAt)});
  };

  render() {
    return (<ScheduleTable columnSize={this.props.columnSize} tableBeginAt={moment(this.props.tableBeginAt, 'HH:mm')} events={this.state.events} authenticityToken={this.props.authenticityToken} dispatch={this.dispatch}/>);
  }
}

ScheduleTableContainer.propTypes = {
  authenticityToken: PropTypes.string.isRequired,
  columnSize: PropTypes.number.isRequired,
  tableBeginAt: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
};

