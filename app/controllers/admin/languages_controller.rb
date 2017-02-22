class Admin::LanguagesController < ApplicationController
  before_action :find_language, except: [:index, :new, :create]
  before_action :authorize, except: [:index, :new, :create]
  before_action :authorize_class, only: [:index, :new, :create]

  def index
    @languages = Language.select :id, :name
  end

  def new
  end

  def create
    @language = Language.new language_params
    respond_to do |format|
      if @language.save
        format.html {redirect_to [:admin, @language]}
        format.json do
          render json: {message: flash_message("created"),
            language: @language}
        end
      else
        format.html {render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @language.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  def edit
    respond_to do |format|
      format.html
      format.json {render json: {language: @language}}
    end
  end

  def update
    respond_to do |format|
      if @language.update_attributes language_params
        format.html {redirect_to [:admin, @language]}
        format.json do
          render json: {message: flash_message("updated"),
            language: @language}
        end
      else
        format.html {render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @language.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @language.destroy
    respond_to do |format|
      format.html {redirect_to admin_languages_path}
      format.json do
        if @language.deleted?
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def language_params
    params.require(:language).permit Language::ATTRIBUTE_PARAMS
  end

  def find_language
    @language = Language.find_by id: params[:id]
    unless @language
      respond_to do |format|
        format.html {redirect_to admin_languages_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def authorize
    admin_authorize @language
  end

  def authorize_class
    admin_authorize Language
  end
end
