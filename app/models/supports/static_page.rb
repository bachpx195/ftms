class Supports::StaticPage
  def languages
    @languages = Language.all
  end

  def courses
    @courses = Course.all
  end
end
