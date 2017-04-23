class Serializers::Profiles::ProgramsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :training_standards

  def training_standards
    Hash.new
  end
end
