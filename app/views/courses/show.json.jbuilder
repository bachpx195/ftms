json.course do
  json.extract! @course, :id, :name, :image, :description, :status, :creator_id,
    :document, :language_id, :training_standard_id
  json.managers @supports.managers do |user|
    json.extract! user, :id, :name, :avatar
    user_course = user.user_courses.find_by course_id: @course.id
    json.user_course user_course
  end
  json.members @supports.members do |user|
    json.extract! user, :id, :name, :avatar
    user_course = user.user_courses.find_by course_id: @course.id
    json.user_course user_course
  end
  json.unassigned_users @supports.unassigned_users, :id, :name, :avatar
  json.start_date @course.start_date
  json.end_date @course.end_date
  json.creator @course.creator
  json.owner @course.owner
  json.training_standards @supports.training_standards, :id, :name
  json.languages @supports.languages, :id, :name
  json.evaluation_standards @supports.evaluation_standards, :id, :name,
    :min_point, :max_point
  json.evaluation_template @course.training_standard.evaluation_template, :id
  json.member_evaluations @course.member_evaluations do |member_evaluation|
    json.extract! member_evaluation, :id, :member_id, :manager_id, :total_point
    member_evaluation_items = member_evaluation.member_evaluation_items
    if member_evaluation_items.present?
      json.member_evaluation_items member_evaluation_items, :id,
        :evaluation_point, :evaluation_standard_id
    else
      json.member_evaluation_items Array.new
    end
  end
end

json.course_subjects @supports.course_subjects, :id, :name, :image,
  :description, :content, :during_time
