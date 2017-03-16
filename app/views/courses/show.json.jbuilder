json.course do
  json.extract! @course, :id, :name, :image, :description, :status, :creator_id,
    :language_id, :training_standard_id
  json.extract! @course, :id, :name, :image, :description, :status
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
  json.course_subjects @supports.course_subjects
  json.start_date @course.start_date
  json.end_date @course.end_date
  json.creator @course.creator
  json.owner @course.owner
  json.training_standards @supports.training_standards, :id, :name
  json.languages @supports.languages, :id, :name
end

json.course_subjects @supports.course_subjects, :id, :name, :image,
  :description, :content, :during_time
