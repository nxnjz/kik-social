import React from 'react';
import { FormattedMessage } from 'react-intl';
import Icon from 'kiksocial/components/icon';

export default class PromoPanel extends React.PureComponent {
  render() {
    return (
      <div className='wtf-panel promo-panel'>
        <div className='promo-panel__container'>
          <div className='promo-panel-item'>
            <a className='promo-panel-item__btn' href='https://news.kik.com'>
              <Icon id='align-left' className='promo-panel-item__icon' fixedWidth />
              <FormattedMessage id='promo.kik_news' defaultMessage='kik News' />
            </a>
          </div>

          <div className='promo-panel-item'>
            <a className='promo-panel-item__btn' href='https://news.kik.com/support-kik'>
              <Icon id='users' className='promo-panel-item__icon' fixedWidth />
              <FormattedMessage id='promo.partners' defaultMessage='Affiliate Partners' />
            </a>
          </div>

          <div className='promo-panel-item'>
            <a className='promo-panel-item__btn' href='https://apps.kik.com'>
              <Icon id='th' className='promo-panel-item__icon' fixedWidth />
              <FormattedMessage id='promo.kik_apps' defaultMessage='kik Apps' />
            </a>
          </div>
        </div>
      </div>
    )
  }
}