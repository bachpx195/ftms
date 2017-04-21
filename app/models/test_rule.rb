class TestRule < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:id, :name, :total_question, :time_of_test,
    :min_score_for_pass, :opportunity, :number_of_test,
    test_rule_categories_attributes: [:id, :category_id,
      :number_question, :easy, :normal, :hard, :_destroy],
    test_rule_questions_attributes: [:id, :question_id, :_destroy]]

  has_many :test_rule_questions, dependent: :destroy
  has_many :test_rule_categories, dependent: :destroy
  has_many :categories, through: :test_rule_categories
  has_many :exams, dependent: :destroy

  has_many :tasks, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :subjects, through: :tasks, source: :targetable,
    source_type: Subject.name
  has_many :courses, through: :tasks, source: :targetable,
    source_type: Course.name
  has_many :dynamic_tasks, through: :tasks, class_name: DynamicTask.name

  belongs_to :organization
  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  accepts_nested_attributes_for :test_rule_categories, allow_destroy: true,
    reject_if: lambda{|attributes| attributes[:number_question].blank?}
  accepts_nested_attributes_for :test_rule_questions, allow_destroy: true

  validates :name, presence: true
  validates :total_question, presence: true
  validates :time_of_test, presence: true
  validates :min_score_for_pass, presence: true
  validate :validate_categories

  private
  def validate_categories
    test_rule_categories.each do |category|
      if category.number_question <= 0
        errors.add :category,
          I18n.t("test_rules.errors.invalid_number_question")
      end
      if (category.easy + category.normal + category.hard) != 100
        errors.add :category,
          I18n.t("test_rules.errors.invalid_number_question")
      end
    end
  end
end
