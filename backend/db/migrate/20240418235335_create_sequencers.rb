class CreateSequencers < ActiveRecord::Migration[7.1]
  def change
    create_table :sequencers do |t|
      t.text :title
      t.text :trigger

      t.timestamps
    end
  end
end
