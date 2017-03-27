json.team do
  json.extract! @team, :id, :name, :course_subject_id
  json.user_subjects @team.user_subjects do |user_subject|
    json.user_name user_subject.user.name
    json.extract! user_subject, :id, :user_id, :status, :start_date, :end_date
  end
end
