class TaskServices::CreateTask
  def initialize args = {}
    @targetable = args[:targetable]
    @ownerable = args[:ownerable]
    @meta_types_checked = args[:meta_types_checked]
  end

  def perform
    static_task = StaticTask.new targetable: @targetable, ownerable: @ownerable
    if static_task.save
      add_meta_type
      static_task
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
