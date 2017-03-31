require "rails_helper"

RSpec.describe User, type: :model do
  describe "User validation" do
    context "association" do
      it{is_expected.to have_many :moving_histories}
      it{is_expected.to have_many :organizations}
      it{is_expected.to have_many :user_courses}
      it{is_expected.to have_many :user_programs}
      it{is_expected.to have_many :user_subjects}
      it{is_expected.to have_many :course_subjects}
      it{is_expected.to have_many :dynamic_tasks}
      it{is_expected.to have_many :user_roles}
      it{is_expected.to have_many :roles}
      it{is_expected.to have_many :user_functions}
      it{is_expected.to have_many :functions}
      it{is_expected.to have_many :training_standards}
      it{is_expected.to have_many :created_courses}
      it{is_expected.to have_many :courses}
      it{is_expected.to have_many :owned_courses}
      it{is_expected.to have_many :member_evaluations}
      it{is_expected.to have_many :manager_evaluations}

      it{is_expected.to have_one :profile }
    end

    context "column_specifications" do
      it{is_expected.to have_db_column(:name).of_type(:string)}
      it{is_expected.to have_db_column(:email).of_type(:string)}
      it{is_expected.to have_db_column(:avatar).of_type(:string)}
      it{is_expected.to have_db_column(:trainer_id).of_type(:integer)}
      it{is_expected.to have_db_column(:type).of_type(:string)}
      it{is_expected.to have_db_column(:encrypted_password).of_type(:string)}
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
      expect(described_class).to have_constant :ATTRIBUTES_PARAMS
      expect(described_class).to have_constant :ATTRIBUTES_FUNCTION_PARAMS
    end
  end
end
