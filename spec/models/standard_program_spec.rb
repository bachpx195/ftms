require "rails_helper"

RSpec.describe StandardProgram, type: :model do
  describe "association" do
    it{is_expected.to belong_to :program}
    it{is_expected.to belong_to :training_standard}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:program_id).of_type :integer}
    it{is_expected.to have_db_column(:training_standard_id).of_type :integer}
  end
end
