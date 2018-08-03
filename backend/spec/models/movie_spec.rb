require 'rails_helper'

RSpec.describe Movie, type: :model do
  # Ensure timestamps are present
  it { is_expected.to have_timestamps.for(:creating) }
  it { is_expected.to have_timestamps.for(:updating) }

  # Ensure title and year are present before saving
  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:year) }
end
