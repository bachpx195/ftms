class Supports::Statistics::TraineeTypeSupport < Supports::Statistics::ApplicationStatistic
  def trainees_by_trainee_types
    organization ? data_pie_chart : data_column_chart
  end

  def trainee_types
    @trainee_types ||= TraineeType.all
  end

  private
  def organizations
    @organizations ||= @current_user.organizations.includes(:profiles)
  end

  def data_column_chart
    data = Array.new
    data_table = Array.new
    organizations.each do |org|
      hash = {name: org.name}
      numbers = Array.new
      trainee_types.each do |trainee_type|
        hash_table = {organization_name: org.name}
        number = org.profiles.select{|p| p.trainee_type_id == trainee_type.id}.size
        numbers << number
        hash_table = hash_table
          .merge Hash[:trainee_type_name, trainee_type.name, :number, number]
        data_table << hash_table
      end
      hash = hash.merge Hash["data", numbers]
      data << hash
    end
    {trainees_by_trainee_types: data, trainees_by_trainee_types_table: data_table}
  end

  def data_pie_chart
    data = Array.new
    data_table = Array.new
    total = organization.profiles.size
    trainee_types.each do |trainee_type|
      hash_table = {organization_name: organization.name}
      number = organization.profiles.select{|p| p.trainee_type_id == trainee_type.id}.size
      hash_table = hash_table
        .merge Hash[:trainee_type_name, trainee_type.name, :number, number]
      data_table << hash_table
      percent = number.to_f / total.to_f * 100

      data << {name: trainee_type.name, y: number,
        extraValue: ActionController::Base.helpers
          .number_to_percentage(percent)}
    end
    {trainees_by_trainee_types: [{name: I18n.t("statistics.trainee_types.series_name"),
      data: data, colorByPoint: true}],
      trainees_by_trainee_types_table: data_table}
  end
end
