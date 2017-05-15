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
    if task.save
      create_static_task task
    else
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
