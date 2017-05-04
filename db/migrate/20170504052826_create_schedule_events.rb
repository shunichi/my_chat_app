class CreateScheduleEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :schedule_events do |t|
      t.string :name, null: false
      t.datetime :begin_at, null: false
      t.datetime :end_at, null: false
      t.integer :column_index, null: false

      t.timestamps
    end
  end
end
