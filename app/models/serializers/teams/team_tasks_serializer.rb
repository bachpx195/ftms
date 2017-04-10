class Serializers::Teams::TeamTasksSerializer <
  Serializers::SupportSerializer
  attrs :surveys, :assignments, :test_rules, :projects

  %w(surveys assignments test_rules projects).each do |tasks|
    define_method tasks do
      "Serializers::Subjects::#{tasks.titleize.gsub(" ", "")}Serializer"
        .constantize.new(object: object.send(tasks), scope: {owner: object})
        .serializer
    end
  end
end
