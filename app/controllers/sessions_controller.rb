class SessionsController < ApplicationController
  skip_before_action :authenticate_user!

  def new
    redirect_to '/auth/google_oauth2'
  end

  def create
    auth = request.env['omniauth.auth']
    @identity = Identity.find_or_create_with_omniauth!(auth)
    self.current_user = @identity.user
    redirect_to root_url, notice: 'Signed in!'
  end

  def destroy
    self.current_user = nil
    redirect_to root_url, noticre: 'Signed out!'
  end

  def failure
    redirect_to root_url, alert: "Authentication error: #{params[:message].humanize}"
  end
end
