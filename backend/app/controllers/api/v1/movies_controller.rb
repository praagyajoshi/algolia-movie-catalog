module Api::V1
  class MoviesController < ApiController
    before_action :set_movie, only: [:destroy]

    # GET /movies
    def index
      @movies = Movie.all
      json_response(@movies)
    end

    # POST /movies
    def create
      @movie = Movie.create!(movie_params)
      json_response(@movie, :created)
    end

    # DELETE /movies/:id
    def destroy
      @movie.destroy
      head :no_content
    end

    private

    def movie_params
      # Whitelist params
      # TODO: add other params as well
      params.permit(:title, :year)
    end

    def set_movie
      @movie = Movie.find(params[:id])
    end
  end
end
