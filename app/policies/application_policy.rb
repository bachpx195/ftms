class ApplicationPolicy
  attr_reader :user, :record

  def initialize user, record
    @user = user
    @record = record
  end

  Settings.functions.each do |function_name|
    define_method "#{function_name}?" do
      function = Function.find_by controller_name: record[:controller],
        action: function_name.to_s
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
