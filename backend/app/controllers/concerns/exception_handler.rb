module ExceptionHandler
  extend ActiveSupport::Concern

  included do
    # Handling all unknown routes errors raised
    rescue_from ActionController::RoutingError do |e|
      json_response({ message: 'Route not found' }, :not_found)
    end

    # Handling all object not existing errors raised
    rescue_from Mongoid::Errors::DocumentNotFound do |e|
      json_response({ message: e.message }, :not_found)
    end

    # Handling all validation errors raised
    rescue_from Mongoid::Errors::Validations do |e|
      json_response({ message: e.message }, :unprocessable_entity)
    end
  end
end
