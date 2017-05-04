class ScheduleBroadcastJob < ApplicationJob
  queue_as :default

  def perform(schedule_event)
    ActionCable.server.broadcast 'schedule_channel', event: schedule_event.to_h
  end
end
