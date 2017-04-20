class Supports::StandardSubjectSupport
  def initialize args = {}
    @params = args[:params]
  end

  def standard_subject
    @standard_support = StandardSubject.find_by subject_id: @params[:id],
      training_standard_id: @params[:training_standard_id]
  end
end
