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
      json.headline "#{link_to user_subject.subject.name,
        [user_subject.subject]}<span class='hidden'
        data-status='#{user_subject.status}'
        data-course-name='#{user_subject.course_subject.course.name}'></span>"
      json.text "<div class='description'>#{user_subject.subject.description}</div>"
      json.tag " "
      json.asset do
        image = user_subject.subject.image_url
        json.thumbnail image ? image : "no_image.gif"
        if user_subject.assignments.any?
          list = ""
          user_subject.assignments.each do |task|
            dynamic_task = @timeline_supports.dynamic_tasks(task,
              user_subject.course_subject, current_user)
            list <<
              "<div class='task-container'>
                <div class='pull-left'>-&nbsp;#{task.name}</div>
                <div class='pull-right task' data-finish='#{dynamic_task.status == 'finish'}'></div>
              </div>"
          end
        json.credit "<span class='text-danger'>" +
          "#{@timeline_supports.count_assignment("finish")}" + "&nbsp;" +
            t("tasks.task_finish") +
          "</span><span class='text-primary'><br>#{task.name}" +
            "#{@timeline_supports.count_assignment("init")}" + "&nbsp;" +
              t("tasks.task_init") + "<span>"
        else
          list = "You don't have task"
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
