require "rails_helper"

RSpec.describe User, type: :model do
  describe "User validation" do
    context "association" do
      it{expect have_many(:moving_histories)}
      it{expect have_many(:organizations)}
      it{expect have_many(:user_courses)}
      it{expect have_many(:user_programs)}
      it{expect have_many(:user_subjects)}
      it{expect have_many(:course_subjects)}
      it{expect have_many(:dynamic_tasks)}
      it{expect have_many(:user_roles)}
      it{expect have_many(:roles)}
      it{expect have_many(:user_functions)}
      it{expect have_many(:functions)}
      it{expect have_many(:training_standards)}
      it{expect have_many(:created_courses)}
      it{expect have_many(:courses)}
      it{expect have_many(:owned_courses)}
      it{expect have_many(:member_evaluations)}
      it{expect have_many(:manager_evaluations)}

      it{expect have_one(:profile)}
    end

    context "column_specifications" do
      it{expect have_db_column(:name).of_type(:string)}
      it{expect have_db_column(:email).of_type(:string)}
      it{expect have_db_column(:avatar).of_type(:string)}
      it{expect have_db_column(:trainer_id).of_type(:integer)}
      it{expect have_db_column(:type).of_type(:string)}
      it{expect have_db_column(:encrypted_password).of_type(:string)}
    end
  end

  describe "instance method" do
    it "return base components" do

    end

    it "return user task" do

    end
  end

  describe "constant" do
    it "should have a fixed list constant" do
      described_class.expect have_constant :ATTRIBUTES_PARAMS
      described_class.expect have_constant :ATTRIBUTES_FUNCTION_PARAMS
    end
  end
end
