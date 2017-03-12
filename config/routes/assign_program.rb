namespace :assign_program do
  resources :organizations, only: [:create, :destroy]
  resources :standards, only: [:create, :destroy]
end
