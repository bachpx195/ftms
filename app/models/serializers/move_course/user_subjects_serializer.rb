class Serializers::MoveCourse::UserSubjectsSerializer <
  Serializers::SupportSerializer
  attrs :id, :user_id, :status, :user_course_id, :current_progress,
    :user_end_date, :start_date, :end_date, :subject_id, :team_id
end
