class Supports::TrainingStandardSupport
  def initialize args = {}
    @training_standard = args[:training_standard]
  end

  def subjects
    @subjects ||= Subject.select :id, :name
  end

  def training_standards
    @training_standards ||= TrainingStandard.select :id, :name, :description
  end

  def selected_subjects
    @selected_subjects ||= @training_standard.subjects
  end

  def remain_subjects
    @subjects_remain ||= Subject.find_remain_subjects @selected_subjects.ids
  end
end
