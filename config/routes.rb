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
  resources :organizations, except: [:new, :edit] do
    resources :test_rules, only: [:index, :create]
    resources :programs
    resources :subjects
    resources :exams, only: [:index, :show]
    resources :users, except: [:show, :edit]
    resources :training_standards
    get "/statistics/:type" => "statistics#show", as: :statistics_page
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
    resources :courses, except: [:index, :show]
    resources :users, only: :new
  end

  resources :courses do
    resources :subjects
    resources :member_evaluations, only: [:create, :update]
    resources :certificates
  end

  resources :standard_subjects, only: [:index, :create, :destroy]
  resources :stages
  resources :universities
  resources :trainee_types
  resources :functions
  resources :users, only: [:show, :edit] do
    resources :certificates, only: :show
  end
  resources :roles
  resources :role_functions
  resources :documents, only: [:create, :destroy]

  namespace :change_role do
    resources :users, only: [:show, :edit, :update]
  end

  namespace :filter_role do
    resources :roles, only: [:index]
  end
  namespace :clone do
    resources :training_standards, only: [:create]
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
    resources :exams, only: :index
  end
  resources :user_courses do
    resources :subjects, default: {format: "json"}
  end

  resources :teams

  resources :assignments, only: [:show, :create]
  resources :dynamic_tasks, only: [:update]

  resources :dynamic_tasks do
    resources :meta_tasks, except: [:new, :edit, :destroy]
    resource :update_meta_task, only: :update
  end

  resources :projects, except: [:new, :edit] do
    resources :requirements, only: [:create, :update, :destroy]
  end

  resources :moving_histories, only: :index

  namespace :move do
    resources :users, only: :create
    resources :courses, only: :show
  end

  resources :categories do
    resources :questions
  end
  resources :test_rules, except: [:index, :show]
  resources :exams, except: [:new, :edit, :destroy]
  resources :timelines, only: :index
  get "/statistics/:type" => "statistics#show", as: :statistics_page
  resources :share_withs, only: :create
  resources :meta_types, only: :create
  resources :profiles, only: :show
  resources :tasks, only: :show
end
