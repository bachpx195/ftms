class RenameColumnUserIdToOrganizationIdInMetaType < ActiveRecord::Migration[5.0]
  def change
    rename_column :meta_types, :user_id, :organization_id
  end
end
