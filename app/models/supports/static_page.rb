class Supports::StaticPage
  def languages
    @languages = Language.all
  end

  def courses
    @courses = Course.all
  end

  def trainees
    @trainees = Trainee.all
  end

  def trainers
    @trainers = Trainer.all
  end
end
