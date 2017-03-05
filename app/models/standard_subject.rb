class StandardSubject < ApplicationRecord
  belongs_to :subject
  belongs_to :training_standard
end
