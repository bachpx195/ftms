module PolicyObject
  Settings.functions.each do |function_name|
    define_method "#{function_name}?" do
      model = record.to_s.pluralize.underscore
      function = Function.find_by controller_name: "#{model}", action: "#{function_name}"
      @user.functions.include? function
    end
  end

  def new?
    create?
  end

  def edit?
    update?
  end
end
