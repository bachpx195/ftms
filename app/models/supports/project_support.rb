class Supports::ProjectSupport
  def initialize args = {}
    @params = args[:params]
  end

  def projects
    Project.all
  end

  %w(projects_serializer project_serializer).each do |method|
    define_method method do
      variable = self.send method.split("_serializer").first
      unless instance_variable_get "@#{method}"
        instance_variable_set "@#{method}",
          Serializers::Projects::ProjectsSerializer.new(object: variable,
            scope: {supports: self}).serializer
      end
      instance_variable_get "@#{method}"
    end
  end

  def project
    @project = Project.find_by id: @params[:id]
  end

  def course_subject
    @course_subject ||= CourseSubject.find_by id: @params[:subject_id]
  end
end
