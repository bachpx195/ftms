class Serializers::Documents::DocumentsSerializer <
  Serializers::SupportSerializer
  attrs :id, :file, :documentable_type, :documentable_id

  def file
    Hash[:url, object.file.url]
  end
end
