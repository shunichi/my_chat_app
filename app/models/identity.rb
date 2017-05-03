class Identity < ApplicationRecord
  belongs_to :user

  serialize :auth_hash, JSON

  def self.find_or_create_with_omniauth!(auth)
    identity = Identity.find_by(uid: auth['uid'])
    if identity.nil?
      transaction do
        identity = create!(uid: auth['uid'], provider: auth['provider'], auth_hash: auth, user: User.create!(name: auth['info']['name'], image_url: auth['info']['image']))
      end
    end
    identity
  end
end
