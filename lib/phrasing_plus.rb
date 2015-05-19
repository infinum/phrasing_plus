require "phrasing_plus/engine"

module PhrasingPlus
  mattr_accessor :storage
  @storage = :file

  def self.configure
    yield self
  end
end
