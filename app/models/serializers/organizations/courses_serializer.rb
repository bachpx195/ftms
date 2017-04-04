class Serializers::Organizations::CoursesSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :image, :description, :status, :language_id, :start_date,
    :end_date, :creator_id, :program_id, :training_standard_id,  :owner_id,
    :users
  def users
    Serializers::Courses::CourseMembersSerializer
      .new(object: object.managers, scope: {course: object}).serializer
  end
end
