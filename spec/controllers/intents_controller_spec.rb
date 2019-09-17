require 'rails_helper'

RSpec.describe IntentsController, type: :controller do
  render_views

  let(:user) { Fabricate(:user) }
  before { sign_in user, scope: :user }

  describe 'GET #show' do
    subject { get :show, params: { uri: uri } }

    context 'when schema is web+kiksocial' do
      context 'when host is follow' do
        let(:uri) { 'web+kiksocial://follow?uri=test' }

        it { is_expected.to redirect_to authorize_interaction_path(uri: 'test') }
      end

      context 'when host is share' do
        let(:uri) { 'web+kiksocial://share?text=test' }

        it { is_expected.to redirect_to share_path(text: 'test') }
      end

      context 'when host is none of the above' do
        let(:uri) { 'web+kiksocial://test' }

        it { is_expected.to have_http_status 404 }
      end
    end

    context 'when schema is not web+kiksocial' do
      let(:uri) { 'api+kiksocial://test.com' }

      it { is_expected.to have_http_status 404 }
    end

    context 'when uri param is blank' do
      let(:uri) { '' }

      it { is_expected.to have_http_status 404 }
    end

    context 'when uri is invalid' do
      let(:uri) { 'invalid uri://test.com' }

      it { is_expected.to have_http_status 404 }
    end
  end
end
