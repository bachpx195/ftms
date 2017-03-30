require "rails_helper"

RSpec.describe Stage, type: :model do
  describe "Stage validation" do
    context "association" do
      it{expect have_many(:profiles)}
    end

    context "column_specifications" do
      it{expect have_db_column(:name).of_type(:string)}
    end

    context "is valid with name" do
      stage = Stage.new name: "Resigned"
      it{expect(stage).to be_valid}
    end

    context "is invalid without name" do
      stage = Stage.new
      stage.valid?
      it{expect(stage.errors[:name]).to include("can't be blank")}
    end
  end

  describe "constant" do
    it "should have a fixed list constant" do
      described_class.should have_constant :ATTRIBUTE_PARAMS
    end
  end
end
