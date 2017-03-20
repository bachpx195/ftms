json.courses @courses do |course|
  json.extract! course, :id, :name, :description, :status, :image, :program_id
  json.creator course.creator
  json.subjects course.training_standard.subjects, :id
  json.program course.program, :id, :name
  json.managers course.managers.uniq
  json.owner course.owner
  json.members course.members.uniq do |user|
    json.extract! user, :id, :name, :avatar
  end
  json.training_standard course.training_standard, :id, :name
end
