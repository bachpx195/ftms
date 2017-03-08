namespace :assign_program do
  resources :organizations, only: [:create, :destroy]
end
