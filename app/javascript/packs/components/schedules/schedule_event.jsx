import React from 'react';
import PropTypes from 'prop-types';
// import _ from 'lodash';
// import moment from 'moment';

export default class ScheduleEvent extends React.Component {

  render() {
    const { name, beginAt, endAt } = this.props.event;
    const timeFormat = 'h:mm';
    const timeRange = `${beginAt.format(timeFormat)}〜${endAt.format(timeFormat)}`;
    const style = {
      top: `${beginAt.diff(this.props.tableBeginAt, 'minutes')}px`,
      height: `${endAt.diff(beginAt, 'minutes')}px`,
      width: '100%',
    };
    return (
      <div className="schedule-event" style={style}>
        <div className="schedule-event__time">
          {timeRange}
        </div>
        <div className="schedule-event__name">
          {name}
        </div>
      </div>
    );
  }
}

ScheduleEvent.propTypes = {
  tableBeginAt: PropTypes.object.isRequired,
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    beginAt: PropTypes.object.isRequired,
    endAt: PropTypes.object.isRequired,
    columnIndex: PropTypes.number.isRequired,
  }),
};
