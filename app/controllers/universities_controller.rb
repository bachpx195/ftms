class UniversitiesController < ApplicationController
  before_action :find_university, except: [:index, :new, :create]
  before_action :authorize_request

  def index
    universities_serializer = Serializers::UniversitiesSerializer
      .new object: University.all
    @universities = universities_serializer.serializer
    respond_to do |format|
      format.html
      format.json{render json: {universities: @universities}}
    end
  end

  def new
  end

  def create
    @university = University.new university_params.merge(creator: current_user)
    respond_to do |format|
      if @university.save
        universities_serializer = Serializers::UniversitiesSerializer
          .new object: @university
        @university = universities_serializer.serializer
        format.html{redirect_to [:admin, @university]}
        format.json do
          render json: {message: flash_message("created"),
            university: @university}
        end
      else
        format.html{render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @university.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
    universities_serializer = Serializers::UniversitiesSerializer
      .new object: @university
    @university = universities_serializer.serializer
    respond_to do |format|
      format.html
      format.json{render json: {university: @university}}
    end
  end

  def update
    respond_to do |format|
      if @university.update_attributes university_params
        universities_serializer = Serializers::UniversitiesSerializer
          .new object: @university
        @university = universities_serializer.serializer
        format.html{redirect_to [:admin, @university]}
        format.json do
          render json: {message: flash_message("updated"),
            university: @university}
        end
      else
        format.html{render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @university.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @university.destroy
    respond_to do |format|
      format.html{redirect_to admin_universities_path}
      format.json do
        if @university.deleted?
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def university_params
    params.require(:university).permit University::ATTRIBUTE_PARAMS
  end

  def find_university
    @university = University.find_by id: params[:id]
    unless @university
      respond_to do |format|
        format.html{redirect_to admin_universities_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def authorize_request
    authorize_with_multiple page_params.merge(University: @university),
      UniversityPolicy
  end
end
