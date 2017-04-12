require "rails_helper"

RSpec.describe StaticTask, type: :model do
  describe "association" do
    it{is_expected.to have_many(:dynamic_tasks)
      .conditions(targetable_type: "StaticTask")
      .class_name "DynamicTask"}
  end

  context "columns" do
    it{is_expected.to have_db_column(:targetable_id).of_type(:integer)}
    it{is_expected.to have_db_column(:targetable_type).of_type(:string)}
    it{is_expected.to have_db_column(:ownerable_id).of_type(:integer)}
    it{is_expected.to have_db_column(:ownerable_type).of_type(:string)}
    it{is_expected.to have_db_column(:user_id).of_type(:integer)}
    it{is_expected.to have_db_column(:status).of_type(:integer)}
    it{is_expected.to have_db_column(:type).of_type(:string)}
    it{is_expected.to have_db_column(:deleted_at).of_type(:datetime)}
  end

  describe "creation" do
    subject{described_class.create}
    let(:user){User.create email: "iop@gmail.com", password: "123456"}

    it "number of create association member dynamic tasks" do
      subject.dynamic_tasks.create user_id: user.id
      subject.dynamic_tasks.create user_id: user.id
      subject.dynamic_tasks.count.should eq(2)
    end
  end
end
