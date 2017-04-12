class TestRule < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :total_question, :time_of_test,
    :min_score_for_pass, :opportunity, :number_of_test]

  has_many :test_rule_questions, dependent: :destroy
  has_many :test_rule_categories, dependent: :destroy
  has_many :exams, dependent: :destroy

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
