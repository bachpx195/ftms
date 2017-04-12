require "rails_helper"

RSpec.describe EvaluationStandard, type: :model do
  describe "association" do
    it{is_expected.to have_many(:member_evaluation_items).dependent :destroy}

    it{is_expected.to belong_to :evaluation_template}
    it{is_expected.to belong_to(:creator).class_name "User"}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:name).of_type :string}
    it{is_expected.to have_db_column(:max_point).of_type(:integer)
      .with_options default: 0}
    it{is_expected.to have_db_column(:min_point).of_type(:integer)
      .with_options default: 0}
    it{is_expected.to have_db_column(:average_point).of_type(:integer)
      .with_options default: 0}
    it{is_expected.to have_db_column(:evaluation_template_id).of_type :integer}
    it{is_expected.to have_db_column(:deleted_at).of_type :datetime}
    it{is_expected.to have_db_column(:creator_id).of_type(:integer)
      .with_options index: true}
  end

  describe "creation" do
    subject{described_class.create name: "EvaluationStandard",
      min_point: "1",
      max_point: "1",
      average_point: "1"}

    it "number of create association member evaluation items" do
      subject.member_evaluation_items.create
      subject.member_evaluation_items.create
      subject.member_evaluation_items.count.should eq(2)
    end
  end

  describe "validation" do
    it "is valid with a name, during_time" do
      evaluation_standard = EvaluationStandard.new name: "EvaluationStandard",
        min_point: "1",
        max_point: "1",
        average_point: "1"

      expect(evaluation_standard).to be_valid
    end

    it "is invalid without a name" do
      evaluation_standard = EvaluationStandard.new min_point: "1",
        max_point: "1",
        average_point: "1"
      evaluation_standard.valid?
      expect(evaluation_standard.errors[:name]).to include("can't be blank")
    end

    it "is invalid without a min point" do
      evaluation_standard = EvaluationStandard.new name: "EvaluationStandard",
        max_point: "1",
        average_point: "1"
      evaluation_standard.valid?
      expect(evaluation_standard.errors[:min_point]).to include "can't be blank"
    end

    it{should validate_numericality_of :min_point}
    it{should validate_numericality_of :max_point}
  end

  describe "constant" do
    it "should have a fixed list constant" do
      expect(described_class).to have_constant :ATTRIBUTE_PARAMS
    end
  end
end
