class Admin::SubjectsController < ApplicationController

  before_action :find_training_standard, except: [:index, :new]
  before_action :find_subject, except: [:index, :new, :create]

  def index
    @subjects = Subject.all
  end

  def new
  end

  def create
    @subject = @training_standard.subjects.build subject_params
    respond_to do |format|
      if @subject.save
        format.html {redirect_to [:admin, @training_standard, @subject]}
        format.json do
          render json: {message: flash_message("created"),
            subject: @subject}
        end
      else
        format.html {render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @subject.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  def edit
    respond_to do |format|
      format.html
      format.json {render json: {subject: @subject}}
    end
  end

  def update
    respond_to do |format|
      if @subject.update_attributes subject_params
        format.html {redirect_to [:admin, @training_standard, @subject]}
        format.json do
          render json: {message: flash_message("updated"),
            subject: @subject}
        end
      else
        format.html {render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @subject.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @subject.destroy
    respond_to do |format|
      format.html {redirect_to admin_training_standard_subjects_path}
      format.json do
        if @training_standard.deleted?
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def subject_params
    params.require(:subject).permit :name, :image, :description, :content
  end

  def find_training_standard
    @training_standard = TrainingStandard.find_by id: params[:training_standard_id]
    unless @training_standard
      respond_to do |format|
        format.html {redirect_to root_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_subject
    @subject = Subject.find_by id: params[:id]
    unless @subject
      respond_to do |format|
        format.html {redirect_to admin_training_standard_subjects_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end 
end
