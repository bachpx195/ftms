class CreateDocuments < ActiveRecord::Migration[5.0]
  def change
    create_table :documents do |t|
      t.references :documentable, polymorphic: true, index: true
      t.string :file

      t.timestamps
    end
  end
end
