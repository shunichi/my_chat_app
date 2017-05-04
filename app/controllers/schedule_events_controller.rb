class ScheduleEventsController < ApplicationController
  before_action :set_schedule_event, only: %i(destroy)

  def index
    @schedule_events = ScheduleEvent.order(:begin_at)
  end

  def create
    ScheduleEvent.create!(schedule_event_params)
    render json: {}
  end

  def destroy
    @schedule_event.destroy!
    render json: {}
  end

  private

  def set_schedule_event
    @schedule_event = ScheduleEvent.find(params[:id])
  end

  def schedule_event_params
    params.require(:schedule_event).permit(:name, :begin_at, :end_at, :column_index)
  end
end
