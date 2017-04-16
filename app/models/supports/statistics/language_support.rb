class Supports::Statistics::LanguageSupport < Supports::Statistics::ApplicationStatistic
  def trainees_by_languages
    organization ? data_pie_chart : data_column_chart
  end

  def languages
    @languages ||= Language.all
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
      languages.each do |language|
        hash_table = {organization_name: org.name}
        number = org.profiles.select{|p| p.language_id == language.id}.size
        numbers << number
        hash_table = hash_table
          .merge Hash[:language_name, language.name, :number, number]
        data_table << hash_table
      end
      hash = hash.merge Hash["data", numbers]
      data << hash
    end
    {trainees_by_languages: data, trainees_by_languages_table: data_table}
  end

  def data_pie_chart
    data = Array.new
    data_table = Array.new
    total = organization.profiles.size
    languages.each do |language|
      hash_table = {organization_name: organization.name}
      number = organization.profiles.select{|p| p.language_id == language.id}.size
      hash_table = hash_table
        .merge Hash[:language_name, language.name, :number, number]
      data_table << hash_table
      percent = number.to_f / total.to_f * 100

      data << {name: language.name, y: number,
        extraValue: ActionController::Base.helpers
          .number_to_percentage(percent)}
    end
    {trainees_by_languages: [{name: I18n.t("statistics.languages.series_name"),
      data: data, colorByPoint: true}],
      trainees_by_languages_table: data_table}
  end
end
