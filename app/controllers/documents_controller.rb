class DocumentsController < ApplicationController
  before_action :find_documentable, only: [:create]
  before_action :find_document, only: [:destroy]

  def create
    @document = @documentable.documents.build document_params
    if @document.save
      render json: {message: flash_message("created"),
        document: @document.as_json}
    else
      render json: {message: flash_message("not_created"),
        errors: @document.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    if @document.destroy
      render json: {message: flash_message("deleted")}
    else
      render json: {message: flash_message("not_deleted")},
        status: :unprocessable_entity
    end
  end

  private
  def document_params
    params.require(:document).permit Document::ATTRIBUTE_PARAMS
  end

  def find_document
    @document = Document.find_by id: params[:id]
    unless @document
      render json: {message: flash_message("not_found")},
        status: :not_found
    end
  end

  def find_documentable
    klass = params[:document][:documentable_type].classify.constantize
    @documentable = klass.find_by id: params[:document][:documentable_id]
    unless @documentable
      render json: {message: flash_message("not_found")},
        status: :not_found
    end
  end
end
