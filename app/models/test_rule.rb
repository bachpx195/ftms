class TestRule < ApplicationRecord
  ATTRIBUTE_PARAMS = [:name, :total_question, :time_of_test,
    :min_score_for_pass, :opportunity, :number_of_test]

  has_many :rule_questions
  has_many :rule_categories
  has_many :exams

  has_many :tasks, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :subjects, through: :tasks, source: :targetable,
    source_type: Subject.name
  has_many :courses, through: :tasks, source: :targetable,
    source_type: Course.name
  has_many :dynamic_tasks, through: :static_tasks, class_name: DynamicTask.name

  belongs_to :organization
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name
end
