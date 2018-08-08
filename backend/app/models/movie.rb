class Movie
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  include Mongoid::Timestamps::Updated

  include AlgoliaSearch

  field :title, type: String
  field :alternative_titles, type: Array
  field :year, type: Integer
  field :image, type: String
  field :color, type: String
  field :score, type: Float
  field :rating, type: Integer
  field :actors, type: Array
  field :actor_facets, type: Array
  field :genre, type: Array

  # Validations
  validates_presence_of :title, :year, :genre, :rating

  # Image uploader
  mount_uploader :uploaded_image, ImageUploader

  # Search specific configurations
  algoliasearch do
    # send all attributes
    # attribute :title, :alternative_titles, :year, :score, :rating, :actors, :genre

    # send complete URL for the image
    add_attribute :uploaded_image do
      self.uploaded_image.url
    end

    # Defining which attributes will be searchable
    searchableAttributes ['title', 'actors', 'alternative_titles', 'year']

    # Defining facets
    attributesForFaceting [:genre, :rating]

    # Defining highlights
    attributesToHighlight [:title, :actors]
    highlightPreTag '<span class="highlight">'
    highlightPostTag '</span>'

    # Skip out on reireiving these attributes
    unretrievableAttributes [:alternative_titles]

    # Ranking search results based on score
    customRanking ['desc(score)']
  end
end
