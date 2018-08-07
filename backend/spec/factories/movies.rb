FactoryBot.define do
  factory :movie do
    title { Faker::BreakingBad.episode }
    year { 1996 }
    genre { ['suspense', 'drama'] }
    rating { 4 }
  end
end
