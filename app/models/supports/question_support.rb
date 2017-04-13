class Supports::QuestionSupport
  def initialize args = {}
    @params = args[:params]
  end

  def category
    @category ||= Category.find_by id: @params[:category_id]
  end

  def question
    @question ||= Question.find_by id: @params[:id]
  end

  def category_serializer
    Serializers::Categories::CategoryDetailSerializer
      .new(object: category).serializer
  end
end
