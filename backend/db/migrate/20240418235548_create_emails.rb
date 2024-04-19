class CreateEmails < ActiveRecord::Migration[7.1]
  def change
    create_table :emails do |t|
      t.text :title
      t.text :description
      t.references :sequence_item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
