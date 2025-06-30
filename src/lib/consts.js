import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const AVATAR_EXT = 'jpg';
export const AVATAR_PATH = path.resolve('public', 'images', 'avatars');
export const AVATAR_VIEW_PATH = 'images/avatars';
export const PUBLIC_PATH = path.resolve('public');
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const SOURCE_PATH = path.resolve('src');
export const TINYMCE_PATH = path.resolve('node_modules', 'tinymce');
// export const TINYMCE_PATH = path.resolve('public', 'tinymce');
export const TOKEN_STORAGE_KEY = process.env.TOKEN_STORAGE_KEY;
export const VIEWS_PATH = path.resolve('src', 'views');

export const MAILTRAP_HOST = process.env.MAILTRAP_HOST;
export const MAILTRAP_PORT = process.env.MAILTRAP_PORT;
export const MAILTRAP_USER = process.env.MAILTRAP_USER;
export const MAILTRAP_PASS = process.env.MAILTRAP_PASS;

export const NAVITEMS = [
  {
    name: 'Home',
    slug: 'home',
    path: '/',
  },
  {
    name: 'Evaluatie',
    slug: 'evaluatie',
    path: '/evaluatie',
    iconSmall: '<span class="material-symbols-outlined">checklist</span>',
    iconLarge:
      '<span class="material-symbols-outlined" style="font-size: 4rem">checklist</span>',
  },
  {
    name: 'Observatie',
    slug: 'observatie',
    path: '/observatie',
    iconSmall: '<span class="material-symbols-outlined">visibility</span>',
    iconLarge:
      '<span class="material-symbols-outlined" style="font-size: 4rem">visibility</span>',
  },
  {
    name: 'Opleiding',
    slug: 'opleiding',
    path: '/opleiding',
    iconSmall: '<span class="material-symbols-outlined">school</span>',
    iconLarge:
      '<span class="material-symbols-outlined" style="font-size: 4rem">school</span>',
  },
  {
    name: 'Afspraken',
    slug: 'afspraken',
    path: '/afspraken',
    iconSmall: '<span class="material-symbols-outlined">calendar_month</span>',
    iconLarge:
      '<span class="material-symbols-outlined" style="font-size: 4rem">calendar_month</span>',
  },
  {
    name: 'Kledij en materiaal',
    slug: 'kledij-en-materiaal',
    path: '/kledij-en-materiaal',
    iconSmall: '<span class="material-symbols-outlined">construction</span>',
    iconLarge:
      '<span class="material-symbols-outlined" style="font-size: 4rem">construction</span>',
  },
  {
    name: 'Technische fiches',
    slug: 'technische-fiches',
    path: '/technische-fiches',
    iconSmall: '<span class="material-symbols-outlined">text_snippet</span>',
    iconLarge:
      '<span class="material-symbols-outlined" style="font-size: 4rem">text_snippet</span>',
  },
  {
    name: 'Arbeidsongevallen',
    slug: 'arbeidsongevallen',
    path: '/arbeidsongevallen',
    iconSmall: '<span class="material-symbols-outlined">personal_injury</span>',
    iconLarge:
      '<span class="material-symbols-outlined" style="font-size: 4rem">personal_injury</span>',
  },
  {
    name: 'Profiel',
    slug: 'profiel',
    path: '/profiel',
    iconSmall: '<span class="material-symbols-outlined">person</span>',
    iconLarge:
      '<span class="material-symbols-outlined" style="font-size: 4rem">person</span>',
  },
];
