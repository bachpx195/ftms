require "rails_helper"

RSpec.describe EvaluationTemplate, type: :model do
  describe "validation" do
    context "association" do
      it{is_expected.to have_many :evaluation_standards}
      it{is_expected.to have_many :member_evaluations}

      it{is_expected.to belong_to :training_standard}
      it{is_expected.to belong_to :creator}
    end

    context "columns" do
      it{is_expected.to have_db_column(:name).of_type(:string)}
      it{is_expected.to have_db_column(:training_standard_id).of_type(:integer)}
      it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
      it{is_expected.to have_db_column(:creator_id).of_type(:integer)}
    end

    context "creation" do
      it "is valid with a name" do
        evaluation_template = EvaluationTemplate.new name: "template"
        expect(evaluation_template).to be_valid
      end

      it "is invalid without a name" do
        evaluation_template = EvaluationTemplate.new
        evaluation_template.valid?
        expect(evaluation_template.errors[:name]).to include("can't be blank")
      end
    end
  end

  describe "constant" do
    it "should have a fixed list constant" do
      expect(described_class).to have_constant :ATTRIBUTE_PARAMS
    end
  end
end
