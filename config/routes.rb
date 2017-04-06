
class ActionDispatch::Routing::Mapper
  def draw routes_name
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_name}.rb")))
  end
end

Rails.application.routes.draw do
  mount Ckeditor::Engine => "/ckeditor"
  mount ActionCable.server => "/cable"
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
    resources :member_evaluations, only: [:create, :update]
  end

  resources :standard_subjects, only: [:index, :create, :destroy]
  resources :stages
  resources :universities
  resources :trainee_types
  resources :functions
  resources :users
  resources :roles
  resources :role_functions
  resources :documents, only: [:create, :destroy]

  namespace :change_role do
    resources :users, only: [:show, :edit, :update]
  end

  namespace :assign_user do
    resources :courses, only: [:update]
  end
  resources :user_functions
  resources :user_subjects, only: :update
  namespace :assign_task do
    resources :tasks
  end
  namespace :create_task do
    resources :tasks, only: :create
  end

  namespace :my_space do
    resources :courses, only: :index
  end
  resources :user_courses do
    resources :subjects, default: {format: "json"}
  end

  resources :course_subjects do
    resources :teams
  end

  resources :assignments, only: [:show, :create]
  resources :dynamic_tasks, only: [:update]

  resources :dynamic_tasks do
    resources :meta_tasks, except: [:new, :edit, :destroy]
  end

  resources :projects, except: [:new, :edit] do
    resources :requirements, only: [:create, :update, :destroy]
  end
  
  resources :moving_histories, only: :index
end
