class Certificate < ApplicationRecord
  belongs_to :course
  belongs_to :program
  belongs_to :training_result
  belongs_to :user
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  ATTRIBUTE_PARAMS = [:course_id, :program_id, :total_point, :user_id,
    :training_standard_id, :training_result_id]
end
