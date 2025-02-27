import React, { useEffect, useMemo } from 'react';
import { useLocale as useDumiLocale } from 'dumi';
import { ConfigProvider } from 'antd';
import useLocale from '../../hooks/useLocale';
import Banner from './components/Banner';
import Group from './components/Group';
import { useSiteData } from './components/util';
import Theme from './components/Theme';
import BannerRecommends from './components/BannerRecommends';
import ComponentsList from './components/ComponentsList';
import DesignFramework from './components/DesignFramework';
import SiteContext from './components/SiteContext';

const locales = {
  cn: {
    assetsTitle: '组件丰富，选用自如',
    assetsDesc: '大量实用组件满足你的需求，灵活定制与拓展',

    designTitle: '设计语言与研发框架',
    designDesc: '配套生态，让你快速搭建网站应用',
  },
  en: {
    assetsTitle: 'Rich components',
    assetsDesc: 'Practical components to meet your needs, flexible customization and expansion',

    designTitle: 'Design and framework',
    designDesc: 'Supporting ecology, allowing you to quickly build website applications',
  },
};

const Homepage: React.FC = () => {
  const [locale] = useLocale(locales);
  const { id: localeId } = useDumiLocale();
  const localeStr = localeId === 'zh-CN' ? 'cn' : 'en';

  const [siteData] = useSiteData();
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  const updateMobileMode = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    updateMobileMode();
    window.addEventListener('resize', updateMobileMode);
    return () => {
      window.removeEventListener('resize', updateMobileMode);
    };
  }, []);

  const siteValue = useMemo(() => ({ isMobile }), [isMobile]);

  return (
    <ConfigProvider theme={{ algorithm: undefined }}>
      <SiteContext.Provider value={siteValue}>
        <section>
          <Banner>
            <BannerRecommends extras={siteData?.extras?.[localeStr]} icons={siteData?.icons} />
          </Banner>

          <div>
            <Theme />
            <Group
              background="#fff"
              collapse
              title={locale.assetsTitle}
              description={locale.assetsDesc}
              id="design"
            >
              <ComponentsList />
            </Group>
            <Group
              title={locale.designTitle}
              description={locale.designDesc}
              background="#F5F8FF"
              decoration={
                <>
                  {/* Image Left Top */}
                  <img
                    style={{ position: 'absolute', left: 0, top: -50, height: 160 }}
                    src="https://gw.alipayobjects.com/zos/bmw-prod/ba37a413-28e6-4be4-b1c5-01be1a0ebb1c.svg"
                    alt=""
                  />
                </>
              }
            >
              <DesignFramework />
            </Group>
          </div>
        </section>
      </SiteContext.Provider>
    </ConfigProvider>
  );
};

export default Homepage;
