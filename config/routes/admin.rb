namespace :admin do
  root "organizations#index"
  resources :universities
  resources :stages
  resources :trainee_types
  resources :organizations do
    resources :subjects
  end
  resources :training_standards do
    resources :evaluation_templates
  end
  resources :subjects
  resources :standard_subjects, only: [:index, :create, :destroy]
  resources :functions
end
resources :users
resources :roles
resources :role_functions
