json.timeline do
  json.type "default"
  if @timeline_supports.user_subjects.any?
    date = @timeline_supports.user_subjects.first.start_date || @timeline_supports.user_subjects.first.course_subject.course.start_date
    json.date @timeline_supports.user_subjects do |user_subject|
      json.startDate l(user_subject.start_date || date, format: :timeline_js)
      date = user_subject.user_end_date || user_subject.end_date ||
        date + user_subject.subject.during_time
      json.endDate l(user_subject.user_end_date || user_subject.end_date || date,
        format: :timeline_js)
      course_subject = user_subject.course_subject
      json.headline "#{link_to user_subject.subject.name,
        [user_subject.user_course.course, user_subject.subject]}
        <span class='hidden' data-status='#{user_subject.status}'
          data-course-name='#{course_subject.course.name}'></span>"
      json.text "<div class='description'>#{user_subject.subject.description}</div>"
      json.tag " "
      json.asset do
        image = user_subject.subject.image_url
        json.thumbnail image ? image : "no_image.gif"
        if user_subject.assignments.any?
          list = ""
          user_subject.assignments.each do |task|
            dynamic_task = @timeline_supports.dynamic_tasks task,
              user_subject.course_subject, current_user
            list <<
              "<div class='task-container'>
                <div class='pull-left'>-&nbsp;#{task.name}</div>
                <div class='pull-right task' data-finish='#{dynamic_task ?
                  dynamic_task.status == "finish" : false}'></div>
              </div>"
          end
          json.credit "<span class='text-danger'>#{pluralize @timeline_supports
            .count_assignment('finish', course_subject, current_user),
            t('tasks.task')} #{t("tasks.statuses.finished").downcase}</span>
            <br><span class='text-primary'>#{pluralize @timeline_supports
              .count_assignment('init', course_subject, current_user),
              t('tasks.task')} #{t("tasks.statuses.init").downcase}</span>"
        else
          list = t "have_no_task"
        end
        json.thumbnail image
        json.media list
      end
    end
  else
    json.date [0] do
      json.startDate l(Date.today, format: :timeline_js)
      json.endDate l(Date.today, format: :timeline_js)
      json.headline t "timeline.headline"
      json.text t "timeline.content"
      json.tag " "
      json.asset do
        json.media "none"
        json.thumbnail image_url "no_image.gif"
      end
    end
  end
end
