class Serializers::Subjects::CourseSubjectsSerializer <
  Serializers::SupportSerializer
  attrs :id, :subject_id, :subject_name, :subject_description,
    :subject_content, :subject_image, :course_id, :github_link,
    :heroku_link, :redmine_link, :status
end
