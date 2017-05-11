class Supports::ProjectSupport
  def initialize args = {}
    @params = args[:params]
    @current_user = args[:current_user]
  end

  %w(projects requirements).each do |method|
    define_method method do
      unless instance_variable_get "@#{method}"
        instance_variable_set "@#{method}", method.classify.constantize.all
      end
      instance_variable_get "@#{method}"
    end
  end

  %w(projects_serializer project_serializer).each do |method|
    define_method method do
      variable = self.send method.split("_serializer").first
      unless instance_variable_get "@#{method}"
        instance_variable_set "@#{method}",
          Serializers::Projects::ProjectsSerializer.new(object: variable,
            scope: {supports: self, current_user: @current_user}).serializer
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

  def organization
    @organization = Organization.find_by id: @params[:organization_id]
  end

  def organization_of_project
    @organization_of_project ||= project.organization
  end

  def ids_of_course_manager
    @ids_of_course_manager ||=
      project.course_subject.course.course_managers.pluck :user_id
  end
end
