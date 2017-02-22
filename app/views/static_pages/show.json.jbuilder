json.languages @supports.languages do |language|
  json.extract! language, :name, :id, :description
  json.image language.image.url
  json.num_of_trainees language.trainees.count
  json.num_of_courses language.courses.count
end

json.trainees_size @supports.trainees.size
json.trainers_size @supports.trainers.size
json.courses_size @supports.courses.size
