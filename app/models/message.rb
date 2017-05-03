class Message < ApplicationRecord
  belongs_to :user

  validates :content, presence: true

  after_commit :enqueue_job

  private

  def enqueue_job
    MessageBroadcastJob.perform_later self if self.persisted?
  end
end
