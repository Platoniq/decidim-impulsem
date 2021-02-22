# frozen_string_literal: true

require "rails_helper"

# We make sure that the checksum of the file overriden is the same
# as the expected. If this test fails, it means that the overriden
# file should be updated to match any change/bug fix introduced in the core
checksums = [
  {
    package: "decidim-admin",
    files: {
      "/app/views/decidim/admin/organization_appearance/form/_colors.html.erb" => "926acd42a72c91263042502bdf50b400"
    }
  },
  {
    package: "decidim-core",
    files: {
      # layouts
      "/app/views/layouts/decidim/_head_extra.html.erb" => "1b8237357754cf519f4e418135f78440",
      "/app/views/layouts/decidim/_logo.html.erb" => "2713715db652c8107f1fe5f2c4d618b6",
      "/app/views/layouts/decidim/_mini_footer.html.erb" => "55a9ca723b65b8d9eadb714818a89bb3",
      # validators
      "/app/validators/etiquette_validator.rb" => "db6ce8501b07be1306123c9a01903df7"
    }
  },
  {
    package: "decidim-proposals",
    files: {
      # forms
      "/app/forms/decidim/proposals/proposal_wizard_create_step_form.rb" => "b99c3223f1e75f2a69a89ae9a3d28182"
    }
  }
]

describe "Overriden files", type: :view do
  checksums.each do |item|
    # rubocop:disable Rails/DynamicFindBy
    spec = ::Gem::Specification.find_by_name(item[:package])
    # rubocop:enable Rails/DynamicFindBy
    item[:files].each do |file, signature|
      it "#{spec.gem_dir}#{file} matches checksum" do
        expect(md5("#{spec.gem_dir}#{file}")).to eq(signature)
      end
    end
  end

  private

  def md5(file)
    Digest::MD5.hexdigest(File.read(file))
  end
end
