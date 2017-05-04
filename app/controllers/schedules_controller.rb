class SchedulesController < ApplicationController
  def index
    @schedule_events = ScheduleEvent.order(:begin_at)
  end
end
