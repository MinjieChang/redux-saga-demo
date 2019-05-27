import React from 'react';
import loadable from 'react-loadable';
import qs from 'query-string';

const search = qs.parse(window.location.search);
const lan = search.lan || 'en';

const I18nC = loadable.Map({
  loader: {
    C: () => import('./C'),
    h: () => fetch(`./i18n/${lan}.json`).then(res => res.json())
  },
  render(loaded, props) {
    // 注意这里要用.default
    const C = loaded.C.default;
    return <C {...props} h={loaded.h} />;
  },
  loading: () => null
});


export default I18nC;
