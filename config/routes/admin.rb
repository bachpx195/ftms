namespace :admin do
  root "organizations#index"
  resources :universities
  resources :stages
  resources :trainee_types
  resources :organizations do
    resources :programs
    resources :subjects
  end
  resources :roles
  resources :languages
  resources :training_standards do
    resources :evaluation_templates
  end
  resources :subjects
  resources :standard_subjects, only: [:index, :create, :destroy]
  resources :functions
end
resources :users
