import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from '../../libs/redux/StoreProvider';
import { NextIntlClientProvider } from 'next-intl';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './../../theme/theme';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Viact',
  description: '',
};

const RootLayout = async ({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) => {
  let messages;
  try {
    messages = (await import(`../../languages/${lang}.json`)).default;
  } catch (error) {}

  return (
    <html lang={lang}>
      <StoreProvider>
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <NextIntlClientProvider locale={lang} messages={messages}>
              <ThemeProvider theme={theme}>
                <div className={styles.main}> {children}</div>
              </ThemeProvider>
            </NextIntlClientProvider>
          </AppRouterCacheProvider>
        </body>
      </StoreProvider>
    </html>
  );
};
export default RootLayout;
