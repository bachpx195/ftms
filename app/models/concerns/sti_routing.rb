module StiRouting extend ActiveSupport::Concern
  module ClassMethods
    delegate :model_name, to: :base_class
  end
end
