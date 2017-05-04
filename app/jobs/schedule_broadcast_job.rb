class ScheduleBroadcastJob < ApplicationJob
  queue_as :default

  def perform(action, schedule_event_params)
    ActionCable.server.broadcast 'schedule_channel', action: action, event: schedule_event_params
  end
end
