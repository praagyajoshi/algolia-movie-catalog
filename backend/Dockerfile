FROM ruby:2.5.0
LABEL author="praagya.joshi@gmail.com"

# Install dependencies required to run Rails & RubyGems.
# Using apt-get as ruby is a Debian based image.
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs

# Create the main working directory, and set it as the
# base directory for all future commands
RUN mkdir /app
WORKDIR /app

# Copy the Gemfile and Gemfile.lock, and install the gems.
# Added as a separate step to take advantage of Docker's caching
# of images.
COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install
