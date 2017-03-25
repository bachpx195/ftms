class CreateTeamMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :team_members do |t|
      t.integer :member_id
      t.integer :team_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
