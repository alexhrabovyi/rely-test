import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      pink: '#FF8A8A',
      brightYellow: '#F4DEB3',
      yellow: '#F0EAAC',
      green: '#CCE0AC',
      white: '#FFFFFF',
      grey: '#4B4B4B',
      lightGrey: '#8A8A8A',
      softBlue: '#9cd2f7',
      softRed: '#ff7480',
      softGreen: '#90ee90',
      softPink: '#ffbcda',
      softPurple: '#cdc6ff',
      softOrange: '#ffac81',
      softDarkPurple: '#dec5e3',
      softLime: '#c4cea1',
      softAlgal: '#93e1d8',
      fillSoftBlue: '#89B8D7',
      fillSoftRed: '#D16269',
      fillSoftGreen: '#75B975',
      fillSoftPink: '#D49FB6',
      fillSoftPurple: '#A39FC0',
      fillSoftOrange: '#D29271',
      fillSoftDarkPurple: '#BAA8BD',
      fillSoftLime: '#9CA482',
      fillSoftAlgal: '#7DBCB5',
      favourite: '#FFC95A',
    },
  },
  plugins: [],
};

export default config;
