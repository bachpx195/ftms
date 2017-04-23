class Serializers::Profiles::ProfileSerializer <
  Serializers::SupportSerializer
  attrs :id, :email, :name, :profile

  def profile
    data = Hash.new
    data[:programs] = Hash.new
    user_courses.each do |user_course|
      data[:programs][user_course.course.program_id] ||= Hash.new
      data[:programs][user_course.course.program_id][:program] ||= Serializers::Profiles::ProgramsSerializer.new(object: user_course.course.program).serializer
      data[:programs][user_course.course.program_id][:program][:training_standards][user_course.course.training_standard_id] ||= Serializers::Profiles::TrainingStandardsSerializer.new(object: user_course.course.training_standard).serializer
      data[:programs][user_course.course.program_id][:program][:training_standards][user_course.course.training_standard_id]["subjects"] ||= subjects user_course
    end
    data
  end

  private
  def user_courses
    @user_courses ||= object.user_courses.order(created_at: :desc)
  end

  def subjects user_course
    subjects = Array.new
    user_course.user_subjects.each do |user_subject|
      subjects << Serializers::Profiles::UserSubjectsSerializer.new(object: user_subject).serializer
    end
    subjects
  end
end
