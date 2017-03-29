class StagesController < ApplicationController
  before_action :find_stage, except: [:index, :new, :create]
  before_action :authorize_class

  def index
    stages_serializer = Serializers::StagesSerializer
      .new object: Stage.all
    @stages = stages_serializer.serializer
    respond_to do |format|
      format.html
      format.json{render json: {stages: @stages}}
    end
  end

  def new
  end

  def create
    @stage = Stage.new stage_params
    respond_to do |format|
      if @stage.save
        stages_serializer = Serializers::StagesSerializer
          .new object: @stage
        @stage = stages_serializer.serializer
        format.html{redirect_to stage_path(id: @stage[:id])}
        format.json do
          render json: {message: flash_message("created"),
            stage: @stage}
        end
      else
        format.html{render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @stage.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
    stages_serializer = Serializers::StagesSerializer
      .new object: @stage
    @stage = stages_serializer.serializer
  end

  def update
    respond_to do |format|
      if @stage.update_attributes stage_params
        stages_serializer = Serializers::StagesSerializer
          .new object: @stage
        @stage = stages_serializer.serializer
        format.html{redirect_to stage_path(id: @stage[:id])}
        format.json do
          render json: {message: flash_message("updated"),
            stage: @stage}
        end
      else
        format.html{render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @stage.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @stage.destroy
    respond_to do |format|
      format.html{redirect_to stages_path}
      format.json do
        if @stage.deleted?
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def stage_params
    params.require(:stage).permit Stage::ATTRIBUTE_PARAMS
  end

  def find_stage
    @stage = Stage.find_by id: params[:id]
    unless @stage
      respond_to do |format|
        format.html{redirect_to stages_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
