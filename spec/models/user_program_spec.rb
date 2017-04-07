require "rails_helper"

RSpec.describe UserProgram, type: :model do
  describe "association" do
    it{is_expected.to belong_to :user}
    it{is_expected.to belong_to :program}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:program_id).of_type :integer}
    it{is_expected.to have_db_column(:user_id).of_type :integer}
    it{is_expected.to have_db_column(:deleted_at).of_type :datetime}
  end
end
