class Supports::CourseSupport
  attr_reader :course

  def initialize course
    @course = course
  end

  def user_courses
    @user_courses ||= @course.user_courses
  end

  def trainers
    @traineers ||= user_courses.collect{|user_course|
      user_course.user if user_course.type == "CourseManager"}.reject{|user|
      user.nil?}
  end

  def trainees
    @trainees ||= user_courses.collect{|user_course|
      user_course.user if user_course.type == "CourseMember"}.reject{|user|
      user.nil?}
  end

  def users
    @users ||= user_courses.take Settings.course.number_member_show
  end

  def member_size
    @member_size ||= user_courses.size
  end

  def user_subjects
    @user_subjects ||= @course.user_subjects
  end

  def course_subjects
    @course_subjects ||= @course.course_subjects
  end

  def count_member
    @count_member ||= member_size - Settings.course.number_member_show
  end

  def number_of_user_subjects
    @number_of_user_subjects ||= user_subjects.size
  end

  def user_subject_statuses
    @user_subject_statuses ||= UserSubject.statuses
  end

  def documents
    @documents ||= @course.documents
  end

  def languages
    @languages ||= Language.all
  end

  def program
    @program ||= Program.find_by id: @course.program_id
  end

  def training_standards
    @training_standards ||= program.training_standards
  end

  UserSubject.statuses.each do |key, value|
    define_method "number_of_user_subject_#{key}" do
      instance_variable_set "@number_of_user_subject_#{key}",
        user_subjects.select{|user_subject| user_subject.send "#{key}?"}.size
    end
  end
end
