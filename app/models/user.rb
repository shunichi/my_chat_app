class User < ApplicationRecord
  has_many :identities, dependent: :destroy
  has_many :messages, dependent: :destroy

  validates :name, presence: true
end
