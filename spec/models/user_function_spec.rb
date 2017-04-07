require "rails_helper"

RSpec.describe UserFunction, type: :model do
  describe "association" do
    it{is_expected.to belong_to :user}
    it{is_expected.to belong_to :function}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:function_id).of_type :integer}
    it{is_expected.to have_db_column(:user_id).of_type :integer}
  end
end
