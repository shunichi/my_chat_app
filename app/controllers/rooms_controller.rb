class RoomsController < ApplicationController
  def show
    @messages = Message.all.preload(:user)
  end
end
