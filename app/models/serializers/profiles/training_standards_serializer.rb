class Serializers::Profiles::TrainingStandardsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :subjects, :evaluations

  def subjects
    Hash.new
  end

  def evaluations
    Hash.new
  end
end
