class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler

  # Handles all unknown routes by raising a routing error
  # which is then handled in the ExceptionHandler
  def handle_route_not_found
    raise ActionController::RoutingError.new(params[:path])
  end
end
