require 'rails_helper'

RSpec.describe 'Movies API', type: :request do
  # Initialise test data
  let!(:movies) { create_list(:movie, 10) }
  let(:movie_id) { movies.first.id }

  # Test suite for POST /api/v1/movies
  describe 'POST /api/v1/movies' do
    # Valid request payload
    let(:valid_payload) { { title: 'Return of the King', year: 1992, genre: 'fantasy, action', rating: 5 } }

    context 'when the request is valid' do
      # Make the HTTP request with valid payload before each test
      before { post '/api/v1/movies', params: valid_payload }

      it 'creates a movie' do
        expect(json['title']).to eq('Return of the King')
      end

      it 'responds with status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      # Make the HTTP request with invalid payload before each test
      before { post '/api/v1/movies', params: { title: 'The Big Lebowski' } }

      it 'returns validation failure message' do
        expect(response.body).to match(/Validation of Movie failed/)
      end

      it 'responds with status code 422' do
        expect(response).to have_http_status(422)
      end
    end
  end

  # Test suite for DELETE /api/v1/movies/:id
  describe 'DELETE /api/v1/movies/:id' do
    # Make the HTTP request before each test
    before { delete "/api/v1/movies/#{movie_id}" }

    it 'responds with status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
