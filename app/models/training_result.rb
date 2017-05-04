class TrainingResult < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:id, :name, :max_point, :min_point,
    :evaluation_template_id, :_destroy]

  belongs_to :evaluation_template
end
