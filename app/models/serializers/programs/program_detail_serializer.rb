class Serializers::Programs::ProgramDetailSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :program_type, :organization, :parent, :children, :users,
    :user_counts, :training_standards, :courses, :course_counts,
    :program_subjects, :program_subject_counts, :languages, :statuses
  delegate :statuses, to: :supports

  def organization
    Serializers::Programs::OrganizationsSerializer
      .new(object: object.organization).serializer
  end

  def parent
    if object.child?
      Serializers::Programs::SubProgramSerializer
        .new(object: object.parent).serializer
    end
  end

  def children
    Serializers::Programs::SubProgramSerializer
      .new(object: object.children).serializer
  end

  def users
    Serializers::Users::UsersSerializer
      .new(object: supports.users).serializer
  end

  def user_counts
    supports.users.count
  end

  def training_standards
    Serializers::TrainingStandards::TrainingStandardsSerializer
      .new(object: supports.training_standards).serializer
  end

  def courses
    Serializers::Programs::CoursesSerializer
      .new(object: supports.courses).serializer
  end

  def course_counts
    supports.courses.count
  end

  def program_subjects
    Serializers::Programs::ProgramSubjectsSerializer
      .new(object: supports.program_subjects).serializer
  end

  def program_subject_counts
    supports.program_subjects.count
  end

  def languages
    Serializers::Languages::LanguagesSerializer
      .new(object: supports.languages).serializer
  end
end
