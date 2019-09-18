require Rails.root.join('lib', 'kiksocial', 'migration_helpers')

class AddHideNotificationsToMute < ActiveRecord::Migration[5.1]
  include KikSocial::MigrationHelpers

  disable_ddl_transaction!

  def up
    add_column_with_default :mutes, :hide_notifications, :boolean, default: true, allow_null: false
  end

  def down
    remove_column :mutes, :hide_notifications
  end
end
