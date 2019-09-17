# frozen_string_literal: true

task fix_email_case: 'kiksocial:fix_email_case'

namespace :kiksocial do
  desc 'Convert emails to lowercase'
  task :fix_email_case => :environment do
    User.select(:id, :email).all.each do |user|
        user.update_column :email, user.email.downcase
        puts(user.id)
    end
  end
end
