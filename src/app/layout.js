import './globals.css';

export const metadata = {
  title: 'Neat Brand Trade | Premium Industrial Chemicals',
  description: 'Your global partner in chemical distribution and manufacturing. Specializing in high-efficiency ratios and food-grade industrial solutions.',
  icons: {
    icon: '/NBT Logo_.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
