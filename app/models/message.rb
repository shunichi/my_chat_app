class Message < ApplicationRecord
  belongs_to :user

  validates :content, presence: true

  after_commit :enqueue_job

  def to_json
    {
      id: self.id,
      content: self.content,
      user: {id: self.user.id, name: user.name, imageUrl: user.image_url},
    }
  end
  private

  def enqueue_job
    MessageBroadcastJob.perform_later self if self.persisted?
  end
end
