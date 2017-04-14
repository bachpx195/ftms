class QuestionsController < ApplicationController
  before_action :load_supports
  before_action :find_category, only: [:new, :create]
  before_action :find_question, only: :destroy
  before_action :authorize_request

  def new
  end

  def create
    question = @question_supports.category.questions.new question_params
    respond_to do |format|
      format.json do
        if question.save
          render json: {
            question: Serializers::Questions::QuestionsSerializer
              .new(object: question).serializer
          }
        else
          render json: {message: flash_message("not_created"),
            errors: question.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def update
    question = @question_supports.question
    respond_to do |format|
      format.json do
        if question.update_attributes question_params
          render json: {
            message: flash_message("updated"),
            question: Serializers::Questions::QuestionsSerializer
              .new(object: question).serializer
          }
        else
          render json: {message: flash_message("not_updated"),
            errors: category.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        if @question_supports.question.destroy
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def question_params
    params.require(:question).permit Question::ATTRIBUTE_PARAMS
  end

  def load_supports
    @question_supports = Supports::QuestionSupport.new params: params
  end

  def find_category
    unless @question_supports.category
      respond_to do |format|
        format.html{redirect_to categories_url}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_question
    unless @question_supports.question
      respond_to do |format|
        format.html{redirect_to categories_path}
        format.json do
          render json: {message: flash_message("not_found")}, status: :not_found
        end
      end
    end
  end

  def authorize_request
    authorize_with_multiple page_params
      .merge(question_supports: @question_supports), CategoryPolicy
  end
end
