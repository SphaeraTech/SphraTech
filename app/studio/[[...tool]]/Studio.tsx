'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

/**
 * The studio has to be reached through a client module: sanity.config pulls in
 * the studio runtime, which calls React.createContext at module scope. Imported
 * from a server component it is evaluated under the react-server condition,
 * where createContext does not exist, and the production build fails while
 * collecting page data.
 */
export default function Studio() {
  return <NextStudio config={config} />;
}
