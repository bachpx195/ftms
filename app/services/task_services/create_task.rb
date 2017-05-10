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
      static_task = StaticTask.create targetable_id: task.id,
        targetable_type: @type, ownerable_id: @ownerable_id,
        ownerable_type: @ownerable_type
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
end
