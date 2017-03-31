require "rails_helper"

RSpec.describe TrainingStandard, type: :model do
  describe "validation" do
    context "association" do
      it{is_expected.to have_one :evaluation_template}
      it{is_expected.to have_many :courses}
      it{is_expected.to have_many :standard_subjects}
      it{is_expected.to have_many(:subjects).through :standard_subjects}
      it{is_expected.to have_many :standard_organizations}
      it{is_expected.to have_many(:organizations)
        .through :standard_organizations}
      it{is_expected.to have_many :standard_programs}
      it{is_expected.to have_many(:programs)
        .through :standard_programs}

      it{is_expected.to belong_to :creator}
    end

    context "columns" do
      it{is_expected.to have_db_column(:name).of_type(:string)}
      it{is_expected.to have_db_column(:creator_id).of_type(:integer)}
      it{is_expected.to have_db_column(:description).of_type(:text)}
      it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
    end

    context "creation" do
      it "is valid with a name" do
        training_standard = TrainingStandard.new name: "standard"
        expect(training_standard).to be_valid
      end

      it "is invalid without a name" do
        training_standard = TrainingStandard.new
        training_standard.valid?
        expect(training_standard.errors[:name]).to include("can't be blank")
      end
    end
  end

  describe "constant" do
    it "should have a fixed list constant" do
      expect(described_class).to have_constant :ATTRIBUTE_PARAMS
    end
  end
end
