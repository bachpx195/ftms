json.subject_detail do
  json.extract! @subject, :name, :id, :content, :description, :during_time
  json.image @subject.image.url
  json.training_standard @subject.training_standards, :name
  json.statuses @subject.user_subjects.statuses

  json.task do
    json.surveys @subject_supports.surveys_not_in_static_task,
      :name, :id, :content
    json.assignments @subject_supports.assignments_not_in_static_task,
      :name, :id
    json.test_rules @subject_supports.test_rules_not_in_static_task, :name, :id
  end

  json.subject_task do
    json.surveys @subject.surveys do |survey|
      json.extract! survey, :id, :name, :content
      task = @subject.static_tasks.find_by targetable: survey
      json.task_id task.id
    end
    json.assignments @subject.assignments do |assignment|
      json.extract! assignment, :id, :name, :content
      task = @subject.static_tasks.find_by targetable: assignment
      json.task_id task.id
    end
    json.test_rules @subject.test_rules do |test_rule|
      json.extract! test_rule, :id, :name, :content
      task = @subject.static_tasks.find_by targetable: test_rule
      json.task_id task.id
    end
  end
  if @course
    if @course_subject
      json.course_subject_task do
        json.surveys @course_subject.static_surveys do |survey|
          json.extract! survey, :id, :name, :content
          task = @course_subject.static_tasks.find_by targetable: survey
          json.task_id task.id
        end
        json.assignments @course_subject.static_assignments do |assignment|
          json.extract! assignment, :id, :name, :content
          task = @course_subject.static_tasks.find_by targetable: assignment
          json.task_id task.id
        end
        json.test_rules @course_subject.static_test_rules do |test_rule|
          json.extract! test_rule, :id, :name, :content
          task = @course_subject.static_tasks.find_by targetable: test_rule
          json.task_id task.id
        end
        json.project @course_subject.static_projects do |project|
          json.extract! project, :id, :name, :content
          task = @course_subject.static_tasks.find_by targetable: project
          json.task_id task.id
        end
      end
      json.course_subject @course_subject, :id
      json.user_subjects @course_subject
        .unassigned_user_subjects do |user_subject|
        json.extract! user_subject, :id, :user_id, :user_course_id,
          :current_progress, :user_end_date, :start_date, :end_date, :status
        json.user_name user_subject.user.name
        json.user_course_task do
          json.surveys user_subject.user.user_tasks(Survey.name) do |survey|
            json.extract! survey, :id, :name, :content
            dynamic_task = survey.dynamic_tasks
              .find_by ownerable: @course_subject
            json.task_id dynamic_task.id
          end
          json.assignments user_subject.user
            .user_tasks(Assignment.name) do |assignment|
            json.extract! assignment, :id, :name, :content
            dynamic_task = assignment.dynamic_tasks
              .find_by ownerable: @course_subject
            json.task_id dynamic_task.id
          end
          json.test_rules user_subject.user
            .user_tasks(TestRule.name) do |test_rule|
            json.extract! test_rule, :id, :name, :content
            dynamic_task = test_rule.dynamic_tasks
              .find_by ownerable: @course_subject
            json.task_id dynamic_task.id
          end
          json.projects user_subject.user.user_tasks(Project.name) do |project|
            json.extract! project, :id, :name, :content, :task_id
            dynamic_task = project.dynamic_tasks
              .find_by ownerable: @course_subject
            json.task_id dynamic_task.id
          end
        end
      end
      json.course_subject_teams @course_subject.teams do |team|
        json.extract! team, :id, :name, :course_subject_id
        json.user_subjects team.user_subjects do |user_subject|
          json.user_name user_subject.user.name
          json.extract! user_subject, :id, :user_id, :status,
            :start_date, :end_date
        end
      end
    end
  end
end
