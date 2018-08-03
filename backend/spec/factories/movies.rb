FactoryBot.define do
  factory :movie do
    title { Faker::BreakingBad.episode }
    year { 1996 }
  end
end
