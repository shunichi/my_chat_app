import React from 'react';
import PropTypes from 'prop-types';
import ItemTypes from './item_types';
import { DropTarget } from 'react-dnd';

const cellTarget = {
  drop(props, monitor) {
    props.dispatch('dropEvent', { id: monitor.getItem().id, beginAt: props.beginAt, columnIndex: props.columnIndex });
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class ScheduleTableCell extends React.Component {
  render() {
    const { isOver, connectDropTarget } = this.props;
    return connectDropTarget(<div className="schedule-table__cell">
      {isOver &&
        <div className="schedule-table__cell-drop-target"/>
      }
    </div>);
  }
}

ScheduleTableCell.propTypes = {
  dispatch: PropTypes.func.isRequired,
  beginAt: PropTypes.object.isRequired,
  columnIndex: PropTypes.number.isRequired,
};

export default DropTarget(ItemTypes.SCHEDULE_EVENT, cellTarget, collect)(ScheduleTableCell);
