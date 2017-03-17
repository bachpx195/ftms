json.program_detail do
  json.extract! @program, :name, :program_type, :id
  json.organization @program.organization, :name, :id
  json.parent do
    if @program.child?
      json.extract! @program.parent, :name, :program_type
      json.organization @program.organization, :name
    else
      json.null!
    end
  end
  json.children @program.children, :name, :program_type

  json.users @supports.users do |user|
    json.extract! user, :id, :name
    json.avatar user.avatar.url
    json.type user.type
  end
  json.user_counts @supports.users.count
  json.training_standards @supports.training_standards, :id, :name
  json.courses @supports.courses do |course|
    json.extract! course, :id, :name, :image, :description, :status,
      :training_standard_id, :language_id, :program_id, :start_date, :end_date
    json.training_standard course.training_standard, :id, :name
    json.members course.members.uniq do |user|
      json.extract! user, :id, :name, :avatar
    end
    json.image do
      if course.image
        json.extract! course.image.url
      else
        json.null!
      end
    end
    json.course_managers do
      json.array! course.course_managers do |course_manager|
        json.user_avatar course_manager.user.avatar.url
      end
    end
    json.subject_count course.subjects.count
  end
  json.course_counts @supports.courses.count
  json.training_standards @supports.training_standards do |training_standard|
    json.extract! training_standard, :id, :name
  end
  json.program_subjects @supports.program_subjects do |program_subject|
    json.extract! program_subject, :id, :name, :description
    json.image program_subject.image.url
  end
  json.program_subject_counts @supports.program_subjects.count
  json.languages @supports.languages
  json.statuses @supports.statuses
end
json.owners @supports.owners
json.all_roles @supports.all_roles
