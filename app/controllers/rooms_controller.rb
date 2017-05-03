class RoomsController < ApplicationController
  def show
    @messages = Message.order(:id).preload(:user)
  end
end
