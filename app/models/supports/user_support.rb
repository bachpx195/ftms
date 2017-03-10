class Supports::UserSupport
  def organizations
    @organizations ||= Organization.all
  end

  def programs
    @programs ||= Program.all
  end
end
