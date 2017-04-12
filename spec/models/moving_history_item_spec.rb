require "rails_helper"

RSpec.describe MovingHistory, type: :model do
  describe "association" do
    it{is_expected.to belong_to :organization}
    it{is_expected.to belong_to :user}
    it{is_expected.to belong_to :sourceable}
    it{is_expected.to belong_to :destinationable}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:user_id).of_type :integer}
    it{is_expected.to have_db_column(:organization_id).of_type :integer}
    it{is_expected.to have_db_column(:sourceable_id).of_type :integer}
    it{is_expected.to have_db_column(:sourceable_type).of_type :string}
    it{is_expected.to have_db_column(:destinationable_id).of_type :integer}
    it{is_expected.to have_db_column(:destinationable_type).of_type :string}
    it{is_expected.to have_db_column(:move_date).of_type :date}
    it{is_expected.to have_db_column(:deleted_at).of_type :datetime}
  end

  describe "delegate method" do
    it{should delegate_method(:name).to(:user).with_prefix}
    it{should delegate_method(:name).to(:organization).with_prefix}
    it{should delegate_method(:name).to(:sourceable).with_prefix :source}
    it{should delegate_method(:name).to(:destinationable)
      .with_prefix :destination}
  end

  describe "constant" do
    it "should have a fixed list constant" do
      expect(described_class).to have_constant :ATTRIBUTE_PARAMS
    end
  end
end
