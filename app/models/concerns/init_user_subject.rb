module InitUserSubject
  def create_user_subjects user_courses, course_subjects
    user_courses.product(course_subjects).each do |user_course_subject|
      user_subject = user_course_subject.first.user.user_subjects
        .find_by course_subject_id: user_course_subject.second.id
      if user_subject
        user_subject.restore recursive: true
      else
        user_course_subject.first.user_subjects
          .create! user_id: user_course_subject.first.user_id,
          course_subject_id: user_course_subject.second.id,
          subject_id: user_course_subject.second.subject_id,
          start_date: Date.today,
          end_date: Date.today + user_course_subject.second
          .subject.during_time.send('days')
      end
    end
  end
end
