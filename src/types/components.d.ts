// Type definitions for component props
import React from 'react';

declare module '../components/SEOHead' {
  interface SEOHeadProps {
    title: string;
    description: string;
    keywords: string;
    canonical?: string;
    ogImage?: string;
  }
  const SEOHead: React.FC<SEOHeadProps>;
  export default SEOHead;
}

declare module '../components/PageHeader' {
  interface PageHeaderProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
  }
  const PageHeader: React.FC<PageHeaderProps>;
  export default PageHeader;
}

