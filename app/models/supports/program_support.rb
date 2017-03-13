class Supports::ProgramSupport
  def initialize args = {}
    @program = args[:program]
    @role_id = args[:role_id]
  end

  def users
    @users ||= @program.users
  end

  def statuses
    @statuses ||= Course.statuses
  end

  def languages
    @languages ||= Language.all
  end

  def courses
    @courses ||= @program.courses
  end

  def training_standards
    @training_standards ||= @program.training_standards
  end

  def program_subjects
    @program_subjects ||= @program.program_subjects
  end

  def owners
    @owners ||= role ? role.users : []
  end

  def all_roles
    @all_roles ||= Role.all
  end

  private
  def role
    @role ||= Role.find_by id: @role_id
  end
end
