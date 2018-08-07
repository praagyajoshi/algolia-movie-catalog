module Api::V1
  class MoviesController < ApiController
    before_action :set_movie, only: [:destroy]

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
      # Accepting comma separated strings for the following params
      # and also trimming whitespace from each element
      if params.key?(:alternative_titles)
        params[:alternative_titles] = params[:alternative_titles].split(',')
        params[:alternative_titles] = params[:alternative_titles].collect {|x| x.strip}
      end

      if params.key?(:actors)
        params[:actors] = params[:actors].split(',')
        params[:actors] = params[:actors].collect {|x| x.strip}
        logger.error params[:actors]
      end

      if params.key?(:genre)
        params[:genre] = params[:genre].split(',')
        params[:genre] = params[:genre].collect {|x| x.strip}
      end

      # Whitelisting only the following params
      params.permit(
        :title,
        { alternative_titles: [] },
        { actors: [] },
        { genre: [] },
        :rating,
        :year,
        :uploaded_image
      )
    end

    def set_movie
      @movie = Movie.find(params[:id])
    end
  end
end
