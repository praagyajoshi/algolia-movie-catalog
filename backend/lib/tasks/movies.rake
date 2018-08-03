namespace :movies do
  desc "Reindex movies with Algolia search"
  task :reindex => :environment do
    Movie.reindex
  end
end
