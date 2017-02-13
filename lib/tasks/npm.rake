namespace :run do
  desc "build npm"
  task npm: :environment do
    sh "rm app/assets/webpack/* || true && cd client && npm run build:development"
  end
end
