class MetaTask < ApplicationRecord
  acts_as_paranoid

  enum input_type: [:text, :file]

  belongs_to :dynamic_task

  scope :order_desc, ->{order created_at: :desc}
end
