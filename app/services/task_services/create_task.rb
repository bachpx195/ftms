class TaskServices::CreateTask
  def initialize args = {}
    @type = args[:type]
    @targetable = args[:targetable]
    @ownerable_id = args[:ownerable_id]
    @ownerable_type = args[:ownerable_type]
    @meta_types_checked = args[:meta_types_checked]
    @current_user = args[:current_user]
  end

  def perform
    params = @targetable.permit class_eval(@type.classify)::ATTRIBUTE_PARAMS
    task = class_eval(@type.classify).new params
    task.creator_id = @current_user.id
    begin
      ActiveRecord::Base.transaction do
        task.save!
        static_task = StaticTask.new targetable_id: task.id,
          targetable_type: @type, ownerable_id: @ownerable_id,
          ownerable_type: @ownerable_type
        static_task.targetable_id = task.id
        static_task.save!
        if @ownerable_type == "Subject"
          subject = Subject.find_by id: @ownerable_id
          course_subjects = subject.course_subjects
          if course_subjects.any?
            course_subjects.each do |course_subject|
              if course_subject.init?
                StaticTask.create targetable_id: task.id,
                  targetable_type: @type, ownerable: course_subject
              end
            end
          end
        end
        static_task
      end
    rescue
      false
    end
  end

  private
  def add_meta_type
    if @meta_types_checked
      @meta_types_checked.map do |meta_type_checked|
        meta_type = MetaType.find_by id: meta_type_checked[:id]
        @targetable.meta_types << meta_type
      end
    end
  end

  def create_static_task task
    ownerable = @ownerable_type.classify.constantize.find_by id: @ownerable_id
    static_tasks = if @ownerable_type == "CourseSubject"
      CourseSubjectServices::CreateTask.new(targetable: task,
        ownerable: ownerable).perform if ownerable
    else
      SubjectServices::CreateTask.new(targetable: task,
        ownerable: ownerable).perform if ownerable
    end
  end
end
