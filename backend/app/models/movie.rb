class Movie
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  include Mongoid::Timestamps::Updated

  include AlgoliaSearch

  field :title, type: String
  field :alternative_title, type: Array
  field :year, type: Integer
  field :image, type: String
  field :color, type: String
  field :score, type: Float
  field :rating, type: Integer
  field :actors, type: Array
  field :actor_facets, type: Array
  field :genre, type: Array

  # Validations
  validates_presence_of :title, :year

  algoliasearch do
    # send all attributes
    # attributed :title, :alternative_title, :year, :score, :rating, :actors, :genre

    # Making actors attribute unordered because it doesn't matter
    # which actor was matched
    searchableAttributes ['title', 'alternative_title', 'unordered(actors)']

    # Ranking search results based on score
    customRanking ['desc(score)']
  end
end
