require "rails_helper"

RSpec.describe Organization, type: :model do
  describe "validation" do
    context "association" do
      it{is_expected.to have_many :profiles}
      it{is_expected.to have_many(:users).through :profiles}
      it{is_expected.to have_many :programs}
      it{is_expected.to have_many :standard_organizations}
      it{is_expected.to have_many(:training_standards)
        .through :standard_organizations}
      it{is_expected.to have_many :surveys}
      it{is_expected.to have_many :test_rules}
      it{is_expected.to have_many :assignments}
      it{is_expected.to have_many :subjects}
      it{is_expected.to have_many :projects}

      it{is_expected.to belong_to :owner}
      it{is_expected.to belong_to :creator}
    end

    context "columns" do
      it{is_expected.to have_db_column(:name).of_type(:string)}
      it{is_expected.to have_db_column(:parent_id).of_type(:integer)}
      it{is_expected.to have_db_column(:user_id).of_type(:integer)}
      it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
      it{is_expected.to have_db_column(:creator_id).of_type(:integer)}
    end

    context "creation" do
      it "is valid with a name" do
        organization = Organization.new name: "organization"
        expect(organization).to be_valid
      end

      it "is invalid without a name" do
        organization = Organization.new
        organization.valid?
        expect(organization.errors[:name]).to include("can't be blank")
      end
    end
  end
end
