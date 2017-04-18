class Supports::Statistics::InOutSupport < Supports::Statistics::ApplicationStatistic
  def trainees_in_outs
    organization ? in_out_organization : in_out_organizations
  end

  def months
    date_range = @start_date.to_date..@end_date.to_date
    date_months = date_range.map {|d| Date.new(d.year, d.month, 1) }.uniq
    date_months.map {|d| d.strftime I18n.t('date.formats.year_month')}
  end

  private
  def organizations
    @organizations ||= @current_user.organizations.includes(:profiles)
  end

  def in_month? month, date
    date && date >= month.to_date.beginning_of_month &&
      date <= month.to_date.end_of_month
  end

  def in_out_organization
    trainees_in = {name: I18n.t("statistics.in_outs.titles.in")}
    trainees_out = {name: I18n.t("statistics.in_outs.titles.out")}

    trainees = in_out_by_months organization
    [trainees_in.merge({data: trainees.first}),
      trainees_out.merge({data: trainees.last})]
  end

  def in_out_organizations
    trainees_in = []
    trainees_out = []
    organizations.each do |org|
      trainees = in_out_by_months org
      trainees_in << {name: org.name, data: trainees.first}
      trainees_out << {name: org.name, data: trainees.last}
    end

    {trainees_in: trainees_in, trainees_out: trainees_out}
  end

  def in_out_by_months org
    numbers_in = Array.new
    numbers_out = Array.new
    months.each do |month|
      num_in = 0
      num_out = 0
      org.profiles.each do |profile|
        if in_month? month, profile.start_training_date
          num_in += 1
        elsif in_month? month, profile.leave_date
          num_out += 1
        end
      end
      numbers_in << num_in
      numbers_out << num_out
    end

    [numbers_in, numbers_out]
  end
end
