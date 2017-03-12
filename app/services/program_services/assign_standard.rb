class ProgramServices::AssignStandard
  def initialize args = {}
    @standard_ids = args[:standard_ids]
    @program = args[:program]
  end

  def perform
    @program.training_standard_ids += @standard_ids
  end
end
