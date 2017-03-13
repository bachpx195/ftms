json.course do
  json.extract! @course, :id, :name, :image, :description, :status, :creator_id,
    :language_id, :training_standard_id
  json.member_size @supports.member_size
  json.trainers @supports.trainers
  json.trainees @supports.trainees
  json.users @supports.trainers
  json.member_size @supports.member_size
  json.user_subjects @supports.user_subjects
  json.course_subjects @supports.course_subjects
  json.count_member @supports.count_member
  json.number_of_user_subjects @supports.number_of_user_subjects
  json.user_subject_statuses @supports.user_subject_statuses
  json.number_of_user_subject_init @supports.number_of_user_subject_init
  json.number_of_user_subject_in_progress @supports.number_of_user_subject_in_progress
  json.number_of_user_subject_waiting @supports.number_of_user_subject_waiting
  json.number_of_user_subject_finished @supports.number_of_user_subject_finished
  json.program @program
  json.start_date @course.start_date
  json.end_date @course.end_date
  json.creator @course.creator
  json.owner @course.owner
  json.training_standards @supports.training_standards, :id, :name
  json.languages @supports.languages, :id, :name
end


json.course_subjects @supports.course_subjects do |course_subject|
  json.extract! course_subject, :subject_id, :subject_name, :subject_description,
    :subject_content
  json.subject do
    json.during_time course_subject.subject[:during_time]
    json.image course_subject.subject.image
  end
end
