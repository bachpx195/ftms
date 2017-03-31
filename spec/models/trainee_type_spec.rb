require "rails_helper"

RSpec.describe TraineeType, type: :model do
  describe "validation" do
    context "association" do
      it{is_expected.to have_many :profiles}
    end

    context "columns" do
      it{is_expected.to have_db_column(:name).of_type(:string)}
      it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
    end

    context "creation" do
      it "is valid with a name" do
        trainee_type = TraineeType.new name: "trainee type"
        expect(trainee_type).to be_valid
      end

      it "is invalid without a name" do
        trainee_type = TraineeType.new
        trainee_type.valid?
        expect(trainee_type.errors[:name]).to include("can't be blank")
      end
    end
  end

  describe "constant" do
    it "should have a fixed list constant" do
      expect(described_class).to have_constant :ATTRIBUTE_PARAMS
    end
  end
end
