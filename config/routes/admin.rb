namespace :admin do
  resources :universities
  resources :stages
  resources :trainee_types
  resources :organizations
  resources :languages
  resources :training_standards do
    resources :subjects
  end
end
