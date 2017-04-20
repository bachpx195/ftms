class Serializers::OrganizationChartSerializer < Serializers::SupportSerializer
  attrs :id, :name, :owner, :data, :away_trainees

  def owner
    Serializers::OrganizationCharts::TrainerSerializer.new(object: object.owner).serializer
  end

  def data
    data = Hash.new
    trainers.each do |trainer|
      data[trainer.id] = {trainer: Serializers::OrganizationCharts::TrainerSerializer
        .new(object: trainer).serializer, subjects: subjects(trainer)}
    end
    data
  end

  def away_trainees
    user_ids = Profile.select(:user_id).where organization: object, stage_id: 3
    User.where id: user_ids
  end

  private
  def trainers
    trainers = Array.new
    object.courses.each do |course|
      trainers += course.managers
    end
    trainers.uniq
  end

  def list_trainees
    @trainees ||= User.where id: Profile.select(:user_id)
      .where(organization: object, stage_id: 1),
      trainer_id: trainers.pluck(:id)
  end

  def subjects trainer
    trainees = list_trainees.select do |trainee|
      trainee.trainer_id == trainer.id
    end

    subjects = Hash.new
    subjects["free_trainees"] = Array.new
    subjects["subjects"] = Hash.new

    trainees.each do |trainee|
      user_subject = trainee.user_subjects.find{|us| us.in_progress?}
      if user_subject
        subjects["subjects"][user_subject.subject_id] ||=
          Serializers::OrganizationCharts::SubjectSerializer
            .new(object: user_subject.subject).serializer
        subjects["subjects"][user_subject.subject_id]["trainees"] ||= Array.new
        subjects["subjects"][user_subject.subject_id]["trainees"] <<
          Serializers::OrganizationCharts::TrainerSerializer
            .new(object: trainee).serializer
      else
        subjects["free_trainees"] <<
          Serializers::OrganizationCharts::TrainerSerializer
            .new(object: trainee).serializer
      end
    end
    subjects
  end
end
