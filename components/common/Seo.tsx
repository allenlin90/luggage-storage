import { FC } from 'react';
import { NextSeo } from 'next-seo';
import { OpenGraph } from 'next-seo/lib/types';
import { useRouter } from 'next/router';

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  titleTemplate?: string;
}

export const Seo: FC<SeoProps> = ({
  title,
  description,
  image,
  titleTemplate,
}) => {
  const { asPath } = useRouter();

  const openGraph: OpenGraph = {
    title,
    description,
    url: asPath,
  };

  if (image) {
    openGraph.images = [{ alt: title, url: image }];
  }

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={openGraph}
      titleTemplate={titleTemplate}
    />
  );
};
