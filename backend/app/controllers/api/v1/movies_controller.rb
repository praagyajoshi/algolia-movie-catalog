module Api::V1
  class MoviesController < ApiController
    before_action :set_movie, only: [:destroy]
    after_action :index_movies, only: [:create, :destroy]

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
      params.permit(
        :title,
        { alternative_title: [] },
        { actors: [] },
        :year,
        :image
      )
    end

    def set_movie
      @movie = Movie.find(params[:id])
    end

    # Tells Algolia to reindex all the movies we have in store
    def index_movies
      Movie.reindex
    end
  end
end
