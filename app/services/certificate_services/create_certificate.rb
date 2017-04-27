class CertificateServices::CreateCerticate
  def initialize args = {}
    @certifiacte_params = args[:certifiacte_params]
    @current_user = args[:current_user]
  end

  def perform
  end
end
