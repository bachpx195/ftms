require "rails_helper"

RSpec.describe Language, type: :model do
  describe "validation" do
    context "association" do
      it{is_expected.to have_many :courses}
      it{is_expected.to have_many :profiles}
      it{is_expected.to have_many(:trainees).through :profiles}

      it{is_expected.to belong_to :creator}
    end

    context "columns" do
      it{is_expected.to have_db_column(:name).of_type(:string)}
      it{is_expected.to have_db_column(:description).of_type(:string)}
      it{is_expected.to have_db_column(:image).of_type(:string)}
      it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
      it{is_expected.to have_db_column(:creator_id).of_type(:integer)}
    end

    context "creation" do
      it "is valid with a name, image,description" do
        university = Language.new name: "Back Khoa",
          image: File.open(File
            .join(Rails.root, '/spec/fixtures/files/test.png')),
          description: "abc xyz"
        expect(university).to be_valid
      end

      it "is invalid without a name" do
        university = Language.new description: "abc xyz",
          image: File.open(File
            .join(Rails.root, '/spec/fixtures/files/test.png'))
        university.valid?
        expect(university.errors[:name]).to include("can't be blank")
      end

      it "is invalid without an image" do
        university = Language.new name: "Back Khoa",
          description: "abc xyz"
        university.valid?
        expect(university.errors[:image]).to include("can't be blank")
      end

      it "is invalid without a description" do
        university = Language.new name: "Back Khoa",
          image: File.open(File
            .join(Rails.root, '/spec/fixtures/files/test.png'))
        university.valid?
        expect(university.errors[:description]).to include("can't be blank")
      end
    end
  end

  describe "constant" do
    it "should have a fixed list constant" do
      expect(described_class).to have_constant :ATTRIBUTE_PARAMS
    end
  end
end
