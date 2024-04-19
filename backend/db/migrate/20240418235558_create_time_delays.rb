class CreateTimeDelays < ActiveRecord::Migration[7.1]
  def change
    create_table :time_delays do |t|
      t.integer :period
      t.references :sequence_item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
