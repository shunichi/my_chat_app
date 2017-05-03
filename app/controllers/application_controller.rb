class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :authenticate_user!

  helper_method :current_user, :user_signed_in?

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
    cookies.signed['user_id'] = @current_user&.id
    @current_user
  end

  def current_user=(user)
    @current_user = user
    session[:user_id] = user&.id
    cookies.signed['user_id'] = @current_user&.id
  end

  def user_signed_in?
    !!current_user
  end

  def authenticate_user!
    redirect_to signin_url unless user_signed_in?
  end
end
