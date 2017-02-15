json.evaluation_templates do
  json.array! @evaluation_templates do |evaluation_template|
    json.extract! evaluation_template, :name
    json.traning_standard evaluation_template.traning_standard, :name
  end
end
