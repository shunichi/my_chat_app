class Message < ApplicationRecord
  validates :content, presence: true

  after_commit { MessageBroadcastJob.perform_later self }
end
