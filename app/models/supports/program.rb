class Supports::Program
  def initialize program
    @program = program
  end

  def users
    @program.users
  end

  def courses
    @program.courses
  end

  def training_standards
    @program.training_standards
  end

  def program_subjects
    @program.program_subjects
  end
end
