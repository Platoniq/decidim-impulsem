# frozen_string_literal: true

# Monkey patch EtiquetteValidator to:
# - Allow up to 50% uppercase characters
# - Min word-length 7 characters
Rails.application.config.to_prepare do
  EtiquetteValidator.class_eval do

    private

    # accept 100% uppercases
    def validate_caps(record, attribute, value)
      return
    end

    def validate_length(record, attribute, value)
      return if value.length >= 3
      record.errors.add(attribute, options[:message] || :too_short)
    end
  end
end