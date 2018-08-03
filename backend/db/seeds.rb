# Seeds the database with a list of movies read from a json file

require 'json'

start_time = Time.now

# Read the json file as a hash map
file_path = File.join(File.dirname(__FILE__), 'movies.json')
file_data = File.read(file_path)
movie_data = JSON.parse(file_data)

puts "Number of movies = #{movie_data.length}"

# Processing in batches of 10
batch_size = 10
@movie_array = []
i = 0

movie_data.each do |movie_detail|
  # Add remote_image_url field so that Carrierwave knows
  # to fetch the image from this url (format is: 'remote_${field_name}_url')
  movie_detail['remote_image_url'] = movie_detail['image']

  # Stripping:
  # - Object ID (will be added by Mongoid)
  # - image (will be added by Carrierwave)
  movie_detail = movie_detail.except('objectID', 'image')

  movie = Movie.new(movie_detail)
  @movie_array << movie

  if ((i += 1) % batch_size == 0)
    print "."
    Movie.collection.insert_many(@movie_array.map(&:as_document))
    @movie_array = []
  end
end

# Save any remaining movies which were picked up
# after the last batch
if @movie_array.length
  puts "."
  Movie.collection.insert_many(@movie_array.map(&:as_document))
end

puts "Indexing for Algolia search..."
Movie.reindex

end_time = Time.now
seconds_elapsed = end_time - start_time

puts "Done in #{sprintf('%.2f', seconds_elapsed)} seconds!"
