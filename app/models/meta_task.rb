class MetaTask < ApplicationRecord
  acts_as_paranoid

  belongs_to :dynamic_task

  scope :order_desc, ->{order created_at: :desc}
end
