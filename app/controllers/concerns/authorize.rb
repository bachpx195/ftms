module Authorize
  CLASS_NAMES = ["Session", "AssignProgram::Organization",
    "AssignProgram::Standard", "StaticPage", "Program", "Subject",
    "Organization", "Survey", "SubOrganization", "Language",
    "EvaluationTemplate", "TrainingStandard", "ChangeProfile::User",
    "EvaluationStandard", "Course", "MemberEvaluation", "StandardSubject",
    "Stage", "University", "TraineeType", "Function", "User", "Role",
    "RoleFunction", "ChangeRole::User", "AssignUser::Course", "UserFunction",
    "UserSubject", "AssignTask::Task", "CreateTask::Task", "MySpace::Course",
    "UserCourse", "Task"]

  def user_not_authorized
    flash[:alert] = t "flashs.errors.not_authorize"
    redirect_to root_path
  end

  def namespace_authorize query = ""
    klass = params[:controller].classify
    if CLASS_NAMES.include? klass
      klass = class_eval "#{klass}Policy"
      policy = klass.new current_user, check
      query ||= "#{params[:action]}?"
      unless policy.public_send(query)
        error = Pundit::NotAuthorizedError.new "not allowed to #{query} this
          #{record}"
        raise error
      end
    end
  end

  def authorize_class
    klass = params[:controller].classify
    if CLASS_NAMES.include? klass
      klass = class_eval klass
      authorize klass
    else
      raise "Forbidden"
    end
  end
end
