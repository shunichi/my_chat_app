class ScheduleEventsController < ApplicationController
  def index
    @schedule_events = ScheduleEvent.order(:begin_at)
  end

  def create
    ScheduleEvent.create!(schedule_event_params)
    render :nothing
  end

  private

  def schedule_event_params
    params.require(:schedule_event).permit(:name, :begin_at, :end_at, :column_index)
  end
end
