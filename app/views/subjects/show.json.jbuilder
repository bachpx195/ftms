json.subject_detail do
  json.extract! @subject, :name, :id, :content, :description, :during_time
  json.image @subject.image.url
  json.training_standard @subject.training_standards, :name
  json.statuses @subject.user_subjects.statuses

  json.user_subjects @supports.user_subjects do |user_subject|
    json.extract! user_subject, :id, :user_id, :user_course_id,
      :current_progress, :user_end_date, :start_date, :end_date, :status
    json.user_name user_subject.user.name
  end
  json.task do
    json.surveys @supports.surveys_not_in_static_task, :name, :id
    json.assignments @supports.assignments_not_in_static_task, :name, :id
    json.test_rules @supports.test_rules_not_in_static_task, :name, :id
  end
end
