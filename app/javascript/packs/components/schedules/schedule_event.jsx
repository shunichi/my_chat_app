import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './item_types';
// import _ from 'lodash';
// import moment from 'moment';

const eventSource = {
  beginDrag(props) {
    return { id: props.event.id };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class ScheduleEvent extends React.Component {

  onClickDestroy() {
    this.props.dispatch('destroyEvent', this.props.event.id);
  }

  render() {
    const { name, beginAt, endAt } = this.props.event;
    const timeFormat = 'H:mm';
    const timeRange = `${beginAt.format(timeFormat)}〜${endAt.format(timeFormat)}`;
    const { connectDragSource, isDragging } = this.props;
    const style = {
      top: `${beginAt.diff(this.props.tableBeginAt, 'minutes')}px`,
      height: `${endAt.diff(beginAt, 'minutes')}px`,
      width: '100%',
      opacity: (isDragging ? '0.5' : '1.0'),
    };

    return connectDragSource(
      <div className="schedule-event" style={style}>
        <div className="schedule-event__time">
          {timeRange}
        </div>
        <div className="schedule-event__name">
          {name}
        </div>
        <div className="schedule-event__destroy" onClick={this.onClickDestroy.bind(this)}>&times;</div>
      </div>
    );
  }
}

ScheduleEvent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tableBeginAt: PropTypes.object.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    beginAt: PropTypes.object.isRequired,
    endAt: PropTypes.object.isRequired,
    columnIndex: PropTypes.number.isRequired,
  }),
};

export default DragSource(ItemTypes.SCHEDULE_EVENT, eventSource, collect)(ScheduleEvent);
