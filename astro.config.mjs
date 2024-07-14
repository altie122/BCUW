import { defineConfig, squooshImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import webmanifest from "astro-webmanifest";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import starlightUtils from "@lorenzo_lewis/starlight-utils";
export const locales = {
  root: {
    label: 'English',
    lang: 'en'
  },
  es: {
    label: 'Español',
    lang: 'es'
  }
};

const VERCEL_PREVIEW_SITE =
	process.env.VERCEL_ENV !== 'production' &&
	process.env.VERCEL_URL &&
	`https://${process.env.VERCEL_URL}`;

  const site = VERCEL_PREVIEW_SITE || "https://www.bcuw.xyz";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [starlight({
    credits: true,
    favicon: 'bcuwOnlyTitleSquare.png',
    title: 'BCUW',
    social: {
      github: 'https://github.com/Unofficial-BlossomCraft-Wikis/BCUW'
    },
    editLink: {
      baseUrl: 'https://github.com/Unofficial-BlossomCraft-Wikis/BCUW/edit/main/'
    },
    customCss: ['./src/styles/main.css'],
    logo: {
      src: './src/assets/bcuwOnlyTitleNormal.png',
      replacesTitle: true,
    },
    locales,
    components: {
      Head: './src/components/Head.astro',
      Sidebar: './src/components/SideBar.astro'
    },
    lastUpdated: true,
    sidebar: [
      {
        label: 'Main',
        items: [
          {
            label: 'Starting',
            items: [
              {
                label: "Why and What?",
                link: '/starter/home/'
              }, 
              {
                label: "Resources",
                link: '/starter/resources/'
              }, 
              {
                label: "Discord Resources",
                link: '/starter/discordresources/'
              }, 
              {
                label: "Credits",
                link: '/starter/credits/'
              }
            ]
          }, 
          {
            label: 'Contributing',
            items: [
              {
                label: "Staff",
                link: '/contributing/staff/'
              }, 
              {
                label: "How to contribute",
                link: '/contributing/home/'
              }, 
              {
                label: "i18n Tracker",
                link: '/contributing/i18n/'
              }, 
              {
                label: "CDN",
                link: '/contributing/cdn/'
              }, 
              {
                label: "Logos",
                link: '/contributing/logos/'
              }
            ]
          },
          /* { Commented out for now, will be added back in later when the API is finished
            label: 'Usefull things',
            collapsed: true,
            items: []
          },*/
        ],
      },
      {
        label: 'Crates',
        collapsed: true,
        items: [
          {
            label: 'Season',
            collapsed: true,
            autogenerate: {
              directory: '/crates/season'
            }
          }
        ]
      }, 
      {
        label: 'Items',
        collapsed: true,
        autogenerate: {
          directory: '/items/'
        }
      }, 
    ],
    head: [
      {
        tag: 'script',
        attrs: {
          src: 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js',
          type: 'module'
        }
      }
    ],
    plugins: [
      starlightUtils({
        multiSidebar: true,
        switcherStyle: "horizontalList",
      }),
    ],
    }), 
    webmanifest({
      name: 'BCUW',
      icon: './src/assets/bcuwOnlyTitleSquare.png',
      short_name: 'BCUW',
      description: "The BlossomCraft Wiki that's run by players",
      start_url: '/',
      theme_color: '#E16FD6',
      background_color: '#E16FD6',
      display: 'standalone'
    }), 
    tailwind()
  ],
  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: {
    service: squooshImageService(),
  },
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});