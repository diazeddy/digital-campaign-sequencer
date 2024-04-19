class CreateSequenceItems < ActiveRecord::Migration[7.1]
  def change
    create_table :sequence_items do |t|
      t.text :itemType
      t.references :sequencer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
