class Serializers::Projects::ProjectsSerializer < Serializers::SupportSerializer
  attrs :id, :name, :description, :organization, :creator_id, :course_subject,
    :teams_of_project, :teams_of_current_user

  def organization
    Serializers::Organizations::OrganizationsSerializer
      .new(object: @object.organization).serializer
  end

  def course_subject
    object.course_subject
  end

  def teams_of_project
    Serializers::Teams::TeamsSerializer.new(object: @object.teams).serializer
  end

  def teams_of_current_user
    Serializers::Teams::TeamsSerializer.new(object: current_user.teams).serializer
  end
end
