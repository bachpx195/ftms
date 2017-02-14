namespace :admin do
  resources :universities
  resources :stages
  resources :trainee_types
  resources :organizations do
    resources :programs
  end
  resources :languages
  resources :training_standards
  resources :subjects
  resources :users
end
