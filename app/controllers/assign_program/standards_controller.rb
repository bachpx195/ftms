class AssignProgram::StandardsController < ApplicationController
  before_action :find_program, only: [:create, :destroy]

  def create
    ProgramServices::AssignStandard.new(standard_ids: params[:training_standard_id], program: @program).perform
    respond_to do |format|
      format.html {}
      format.json {}
    end
  end

  private
  def find_program
    @program = Program.find_by id: params[:program_id]
  end
end
