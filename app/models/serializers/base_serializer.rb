class Serializers::BaseSerializer
  def initialize args
    @object = args[:object]
    @class_name = args[:class_name].to_s
    @scope = args[:scope]
    @scope.each{|key, value| instance_variable_set "@#{key}", value} if @scope
  end

  def serializer
    serializers = if class_is_relation?
      multi_serializer
    elsif @class_name.present? && self.class.to_s != @class_name
      object_serializer = @class_name.constantize.new object: @object,
        scope: @scope, class_name: @class_name
      object_serializer.serializer
    else
      single_serializer
    end
  end

  def multi_serializer
    return [] if @object.empty?
    class_name = get_class_name.constantize
    serializers = @object.collect do |object|
      object_serializer = class_name.new object: object, scope: @scope
      serializer = object_serializer.serializer
    end
  end

  def single_serializer
    serializers = Hash.new
    self.attributes.each do |attribute|
      instance_variable_set "@#{attribute}", @object.try(attribute)
    end
    self.attributes.each{|method|
      serializers[method.to_sym] = self.send method if method.in? self.methods}
    serializers
  end

  def attributes
    attributes = Array.new
    superclass ||= @class_name.constantize if @class_name.present?
    superclass ||= self.class
    while superclass != Serializers::BaseSerializer do
      attributes += superclass.attributes
      superclass = superclass.superclass
    end
    self.class.conditions.each do |key, value|
      attributes.delete key unless self.send(value)
    end
    attributes
  end

  def class_is_relation?
    superclass = @object.class.superclass
    superclass == ActiveRecord::Relation || superclass.superclass ==
      ActiveRecord::Relation || @object.class == Array
  end

  def get_class_name
    return @class_name if @class_name.present?
    class_name = if self.class == Serializers::BaseSerializer
      sub_class = get_super_class @object.first.class
      "Serializers::#{sub_class.to_s.pluralize}Serializer"
    end
    class_name ||= self.class.to_s
  end

  def get_super_class object_class
    sub_class = object_class
    get_super_class object_class.superclass if object_class != ApplicationRecord
    object_class
  end

  class << self
    def attr_accessor *vars
      @attributes ||= Array.new
      @conditions ||= Hash.new
      attr_var = Array.new
      vars.each_with_index.map do |var, i|
        if vars[i + 1] && vars[i + 1].class == Hash
          @conditions["#{vars[i]}".to_sym] = vars[i + 1][:if]
          attr_var.push vars[i + 1]
        end
      end
      vars -= attr_var
      @attributes.concat vars
      super *vars
    end

    def attributes
      @attributes ||= Array.new
    end

    def conditions
      @conditions ||= Hash.new
    end
  end
end
