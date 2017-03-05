class Supports::TrainingStandard
  def initialize training_standard
    @training_standard = training_standard
  end

  def subjects
    @subjects = Subject.select :id, :name
  end

  def training_standards
    @training_standards = TrainingStandard.select :id, :name, :description
  end

  def selected_subjects
    @selected_subjects = @training_standard.subjects
  end

  def remain_subjects
    @subjects_remain = Subject.where.not id: @selected_subjects.ids
  end
end
