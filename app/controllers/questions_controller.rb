class QuestionsController < ApplicationController
  before_action :load_supports
  before_action :find_category, only: [:new, :create]

  def new
  end

  def create
    question = @question_supports.category.questions.new question_params
    respond_to do |format|
      format.json do
        if question.save
          render json: Serializers::Questions::QuestionsSerializer
            .new(object: question).serializer
        else
          render json: {message: flash_message("not_created"),
            errors: question.errors}, status: :unprocessable_entity
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
end
