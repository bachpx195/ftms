class Supports::UserSupport
  def organizations
    @organizations ||= Organization.all
  end

  def programs
    @programs ||= Program.all
  end

  def roles
    @roles ||= Role.all
  end
end
