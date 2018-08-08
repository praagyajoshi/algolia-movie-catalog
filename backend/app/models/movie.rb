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
  validates :year, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 1906
  }
  validates :rating, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 1,
    less_than_or_equal_to: 5
  }

  # Attach the image uploader
  mount_uploader :uploaded_image, ImageUploader

  # Search specific configurations
  algoliasearch index_name: ENV['ALGOLIA_INDEX_NAME'] do
    # Set complete URL for the uploaded image
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
