class ActionDispatch::Routing::Mapper
  def draw routes_name
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_name}.rb")))
  end
end

Rails.application.routes.draw do

  mount Ckeditor::Engine => "/ckeditor"
  devise_for :users, path: "auth",
    controllers: {sessions: "sessions", passwords: "passwords"},
    path_names: {sign_in: "login", sign_out: "logout"}
  draw :api
  draw :assign_program
  root "static_pages#show"
  resources :static_pages
  resources :organizations do
    resources :programs
    resources :subjects
  end
  resources :subjects do
    resources :surveys
  end
  resources :sub_organizations
  resources :languages
  resources :training_standards do
    resource :evaluation_template
  end

  namespace :change_profile do
    resources :users, only: [:show, :edit, :update]
  end
  resources :evaluation_templates do
    resources :evaluation_standards
  end

  resources :programs do
    resources :courses, except: [:index]
  end

  resources :courses do
    resources :subjects
  end

  resources :standard_subjects, only: [:index, :create, :destroy]
  resources :stages
  resources :universities
  resources :trainee_types
  resources :functions
  resources :users
  resources :roles
  resources :role_functions

  namespace :change_role do
    resources :users, only: [:show, :edit, :update]
  end

  namespace :assign_user do
    resources :courses, only: [:update]
  end
  resources :user_functions
  resources :user_subjects, only: :update
  resources :tasks
end
