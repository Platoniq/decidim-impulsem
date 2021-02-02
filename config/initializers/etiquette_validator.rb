# frozen_string_literal: true

# Monkey patch EtiquetteValidator to:
# - Allow up to 100% uppercase characters
# - Min word-length 3 characters
Rails.application.config.to_prepare do
  EtiquetteValidator.class_eval do
    private

    # accept 50% uppercases
    def validate_caps(record, attribute, value)
      return if value.scan(/[A-Z]/).length < value.length / 2

      record.errors.add(attribute, options[:message] || :too_much_caps)
    end

    # accept words with 3 characters or more
    def validate_length(record, attribute, value)
      return if value.length > 3

      record.errors.add(attribute, options[:message] || :too_short)
    end
  end
end
