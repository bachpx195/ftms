class StandardSubjectsController < ApplicationController
  before_action :authorize_class

  def index
    @standard_subjects = StandardSubject
      .select :id, :training_standard_id, :subject_id
    respond_to do |format|
      format.json do
        render json: {standard_subjects: @standard_subjects}
      end
    end
  end

  def create
    @standard_subject = StandardSubject.new standard_subjects_params
    respond_to do |format|
      if @standard_subject.save
        format.html{redirect_to root_path}
        format.json do
          render json: {message: flash_message("created"),
            standard_subject: @standard_subject}
        end
      else
        format.html{render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @standard_subject.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @standard_support = Supports::StandardSubjectSupport.new params: params
    respond_to do |format|
      if @standard_support.standard_subject.destroy
        format.html{redirect_to root_path}
        format.json do
          render json: {message: flash_message("deleted"),
            standard_subject: @standard_support.standard_subject}
        end
      else
        format.json do
          render json: {message: flash_message("not_deleted"),
            errors: @standard_support.standard_subject.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def standard_subjects_params
    params.require(:standard_subject).permit :training_standard_id, :subject_id
  end
end
