namespace :admin do
  root "organizations#index"
  resources :universities
  resources :stages
  resources :trainee_types
  resources :organizations do
    resources :programs
  end
  resources :languages
  resources :training_standards do
    resources :evaluation_templates
  end
  resources :subjects
  resources :users
end
