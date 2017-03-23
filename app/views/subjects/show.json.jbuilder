json.subject_detail do
  json.extract! @subject, :name, :id, :content, :description, :during_time
  json.image @subject.image.url
  json.training_standard @subject.training_standards, :name
  json.statuses @subject.user_subjects.statuses

  json.user_subjects @subject_supports.user_subjects do |user_subject|
    json.extract! user_subject, :id, :user_id, :user_course_id,
      :current_progress, :user_end_date, :start_date, :end_date, :status
    json.user_name user_subject.user.name
  end
  
  json.task do
    json.surveys @subject_supports.surveys_not_in_static_task, :name, :id, :content
    json.assignments @subject_supports.assignments_not_in_static_task, :name, :id
    json.test_rules @subject_supports.test_rules_not_in_static_task, :name, :id
  end

  json.subject_task do
    json.surveys @subject.surveys do |survey|
      json.extract! survey, :id, :name, :content
      task = @subject.tasks.find_by targetable: survey
      json.task_id task.id
    end
    json.assignments @subject.assignments do |assignment|
      json.extract! assignment, :id, :name, :content
      task = @subject.tasks.find_by targetable: assignment
      json.task_id task.id
    end
    json.test_rules @subject.test_rules do |test_rule|
      json.extract! test_rule, :id, :name, :content
      task = @subject.tasks.find_by targetable: test_rule
      json.task_id task.id
    end
  end
end
