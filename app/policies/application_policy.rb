class ApplicationPolicy
  attr_reader :user, :record

  def initialize user, record
    @user = user
    @record = record
  end

  Settings.functions.each do |function_name|
    define_method "#{function_name}?" do
      function_create = Function.find_by controller_name: record[:controller],
        action: "create"
      function = Function.find_by controller_name: record[:controller],
        action: function_name.to_s
      (@user.functions.include? function) || (@user.functions.include? function_create)
    end
  end

  def new?
    create?
  end

  def edit?
    update?
  end
end
