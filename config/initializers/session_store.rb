# Be sure to restart your server when you modify this file.

Rails.application.config.session_store :cookie_store, key: '_kiksocial_session', secure: (Rails.env.production? || ENV['LOCAL_HTTPS'] == 'true')
