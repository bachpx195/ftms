json.course do
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
end
