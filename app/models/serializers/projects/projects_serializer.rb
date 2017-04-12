class Serializers::Projects::ProjectsSerializer < Serializers::SupportSerializer
  attrs :id, :name, :description, :organization, :creator_id, :course_subject

  def organization
    Serializers::Organizations::OrganizationsSerializer
      .new(object: @object.organization).serializer
  end

  def course_subject
    supports.course_subject
  end
end
