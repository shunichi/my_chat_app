class HomeController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    redirect_to room_url if user_signed_in?
  end
end
