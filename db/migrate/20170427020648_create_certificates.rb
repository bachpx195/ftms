class CreateCertificates < ActiveRecord::Migration[5.0]
  def change
    create_table :certificates do |t|
      t.integer :course_id
      t.integer :program_id
      t.integer :training_standard_id
      t.integer :user_id
      t.integer :total_point
      t.integer :training_result_id
      t.integer :creator_id

      t.timestamps
    end
  end
end
