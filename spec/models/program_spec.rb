require "rails_helper"

RSpec.describe Program, type: :model do
  describe "validation" do
    context "association" do
      it{is_expected.to have_many :courses}
      it{is_expected.to have_many :profiles}
      it{is_expected.to have_many :standard_programs}
      it{is_expected.to have_many(:training_standards)
        .through :standard_programs}
      it{is_expected.to have_many(:program_subjects)
        .through(:training_standards).source :subjects}
      it{is_expected.to have_many :user_programs}
      it{is_expected.to have_many(:users)
        .through :user_programs}
      it{is_expected.to have_many :sources}
      it{is_expected.to have_many :destinations}
      it{is_expected.to belong_to :organization}
      it{is_expected.to belong_to :creator}
    end

    context "columns" do
      it{is_expected.to have_db_column(:name).of_type(:string)}
      it{is_expected.to have_db_column(:program_type).of_type(:integer)}
      it{is_expected.to have_db_column(:parent_id).of_type(:integer)}
      it{is_expected.to have_db_column(:organization_id).of_type(:integer)}
      it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
      it{is_expected.to have_db_column(:creator_id).of_type(:integer)}
    end

    context "creation" do
      it "is valid with a name" do
        program = Program.new name: "program"
        expect(program).to be_valid
      end

      it "is invalid without a name" do
        program = Program.new
        program.valid?
        expect(program.errors[:name]).to include("can't be blank")
      end
    end
  end

  describe "constant" do
    it "should have a fixed list constant" do
      expect(described_class).to have_constant :ATTRIBUTE_PARAMS
    end
  end
end
