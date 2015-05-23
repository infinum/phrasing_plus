require 'spec_helper'

RSpec.describe PhrasingImagesController, :type => :controller do
  context "PUT update" do

    let(:phrasing_image) { PhrasingImage.create!(key: 'headline-image') }

    it "updates the image when valid file given" do
      put :update, id: phrasing_image.id, phrasing_image: { image: Rack::Test::UploadedFile.new('spec/test_image.png') }

      expect(response.status).to eq(200)

      expect(phrasing_image.reload['image']).to eq('test_image.png')
    end

    it "doesn't update the image when invalid file given" do
      put :update, id: phrasing_image.id, phrasing_image: { image: Rack::Test::UploadedFile.new('spec/test.txt') }

      expect(response.status).to eq(403)
    end

    context 'when disabled can edit phrases' do

      it 'should throw unauthorized' do
        allow(controller).to receive(:can_edit_phrases?).and_return(false)

        put :update, id: phrasing_image.id, phrasing_image: { image: Rack::Test::UploadedFile.new('spec/test_image.png') }

        expect(response.status).to eq(401)
      end
    end
  end
end
