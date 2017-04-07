class Serializers::Subjects::TasksSerializer < Serializers::SupportSerializer
  attrs :surveys, :assignments, :test_rules

  %w(surveys assignments test_rules).each do |tasks|
    define_method tasks do
      remaining_tasks = subject_supports.send "#{tasks}_not_in_static_task"
      "Serializers::Subjects::#{tasks.titleize.gsub(" ", "")}Serializer"
        .constantize.new(object: remaining_tasks).serializer
    end
  end
end
