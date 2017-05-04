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
      schedule_event.update!(begin_at: event_params['begin_at'], column_index: event_params['column_index'])
    end
  end
end
