class ScheduleChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'schedule_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def update_event(data)
    event_params = data['event'];
    if schedule_event = ScheduleEvent.find_by(id: event_params['id'])
      schedule_event.update!(event_params.slice('begin_at', 'end_at', 'column_index'))
    end
  end
end
