# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_04_18_235558) do
  create_table "emails", force: :cascade do |t|
    t.text "title"
    t.text "description"
    t.integer "sequence_item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sequence_item_id"], name: "index_emails_on_sequence_item_id"
  end

  create_table "sequence_items", force: :cascade do |t|
    t.text "itemType"
    t.integer "sequencer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sequencer_id"], name: "index_sequence_items_on_sequencer_id"
  end

  create_table "sequencers", force: :cascade do |t|
    t.text "title"
    t.text "trigger"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "time_delays", force: :cascade do |t|
    t.integer "period"
    t.integer "sequence_item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sequence_item_id"], name: "index_time_delays_on_sequence_item_id"
  end

  add_foreign_key "emails", "sequence_items"
  add_foreign_key "sequence_items", "sequencers"
  add_foreign_key "time_delays", "sequence_items"
end
