class CreateIdentities < ActiveRecord::Migration[5.1]
  def change
    create_table :identities do |t|
      t.string :uid, null: false
      t.string :provider, null: false
      t.text :auth_hash, null: false
      t.references :user, index: true, foreign_key: true, null: false

      t.timestamps
    end
  end
end
