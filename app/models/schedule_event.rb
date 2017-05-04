class ScheduleEvent < ApplicationRecord
  validates :name, :begin_at, :end_at, :column_index, presence: true

  def to_h
    {
      id: self.id,
      name: self.name,
      beginAt: begin_at.iso8601,
      endAt: end_at.iso8601,
      columnIndex: column_index,
    }
  end

  def self.create_dummies
    t = Time.current.change(hour: 8)
    %w(red black yellow blue green).each_with_index do |name, index|
      self.create!(name: name, begin_at: t, end_at: t + 1.hour, column_index: index)
      t += 1.hour
    end
  end
end
