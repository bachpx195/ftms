require "rails_helper"

RSpec.describe Answer, type: :model do
  describe "association" do
    it{is_expected.to have_many :results}

    it{is_expected.to belong_to :question}
  end

  describe "columns" do
    it{is_expected.to have_db_column(:question_id).of_type(:integer)}
    it{is_expected.to have_db_column(:content).of_type(:string)}
    it{is_expected.to have_db_column(:is_correct).of_type(:boolean)
      .with_options(default: false)}
  end

  describe "creation" do
    subject{described_class.create}

    it "number of create association results" do
      subject.results.create
      subject.results.create
      subject.results.count.should eq(2)
    end
  end
end
