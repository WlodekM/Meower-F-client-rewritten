
/**
 * @roxi/routify 2.18.12
 * File generated Thu Nov 23 2023 16:51:56 GMT+0200 (за східноєвропейським стандартним часом)
 */

export const __version = "2.18.12"
export const __timestamp = "2023-11-23T14:51:56.759Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "name": "_layout",
  "filepath": "/_layout.svelte",
  "root": true,
  "ownMeta": {},
  "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/_layout.svelte",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "_fallback.svelte",
      "filepath": "/_fallback.svelte",
      "name": "_fallback",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/_fallback.svelte",
      "importPath": "../src/pages/_fallback.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": true,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/_fallback",
      "id": "__fallback",
      "component": () => import('../src/pages/_fallback.svelte').then(m => m.default)
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "@[username]",
      "filepath": "/@[username]",
      "name": "@[username]",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/@[username]",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/@[username]/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/@[username]/index.svelte",
          "importPath": "../src/pages/@[username]/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/@:username/index",
          "id": "___username_index",
          "component": () => import('../src/pages/@[username]/index.svelte').then(m => m.default)
        },
        {
          "isFile": false,
          "isDir": true,
          "file": "posts",
          "filepath": "/@[username]/posts",
          "name": "posts",
          "ext": "",
          "badExt": false,
          "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/@[username]/posts",
          "children": [
            {
              "isFile": true,
              "isDir": false,
              "file": "index.svelte",
              "filepath": "/@[username]/posts/index.svelte",
              "name": "index",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/@[username]/posts/index.svelte",
              "importPath": "../src/pages/@[username]/posts/index.svelte",
              "isLayout": false,
              "isReset": false,
              "isIndex": true,
              "isFallback": false,
              "isPage": true,
              "ownMeta": {},
              "meta": {
                "recursive": true,
                "preload": false,
                "prerender": true
              },
              "path": "/@:username/posts/index",
              "id": "___username_posts_index",
              "component": () => import('../src/pages/@[username]/posts/index.svelte').then(m => m.default)
            }
          ],
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": false,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/@:username/posts"
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/@:username"
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "about.svelte",
      "filepath": "/about.svelte",
      "name": "about",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/about.svelte",
      "importPath": "../src/pages/about.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/about",
      "id": "_about",
      "component": () => import('../src/pages/about.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "changelog.svelte",
      "filepath": "/changelog.svelte",
      "name": "changelog",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/changelog.svelte",
      "importPath": "../src/pages/changelog.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {
        "bundle": false
      },
      "meta": {
        "bundle": false,
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/changelog",
      "id": "_changelog",
      "component": () => import('../src/pages/changelog.svelte').then(m => m.default)
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "chats",
      "filepath": "/chats",
      "name": "chats",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/chats",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "[chatid].svelte",
          "filepath": "/chats/[chatid].svelte",
          "name": "[chatid]",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/chats/[chatid].svelte",
          "importPath": "../src/pages/chats/[chatid].svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/chats/:chatid",
          "id": "_chats__chatid",
          "component": () => import('../src/pages/chats/[chatid].svelte').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/chats/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/chats/index.svelte",
          "importPath": "../src/pages/chats/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/chats/index",
          "id": "_chats_index",
          "component": () => import('../src/pages/chats/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/chats"
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "groupcat.svelte",
      "filepath": "/groupcat.svelte",
      "name": "groupcat",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/groupcat.svelte",
      "importPath": "../src/pages/groupcat.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/groupcat",
      "id": "_groupcat",
      "component": () => import('../src/pages/groupcat.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "home.svelte",
      "filepath": "/home.svelte",
      "name": "home",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/home.svelte",
      "importPath": "../src/pages/home.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/home",
      "id": "_home",
      "component": () => import('../src/pages/home.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "inbox.svelte",
      "filepath": "/inbox.svelte",
      "name": "inbox",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/inbox.svelte",
      "importPath": "../src/pages/inbox.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/inbox",
      "id": "_inbox",
      "component": () => import('../src/pages/inbox.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/index.svelte",
      "importPath": "../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "logout.svelte",
      "filepath": "/logout.svelte",
      "name": "logout",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/logout.svelte",
      "importPath": "../src/pages/logout.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/logout",
      "id": "_logout",
      "component": () => import('../src/pages/logout.svelte').then(m => m.default)
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "posts",
      "filepath": "/posts",
      "name": "posts",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/posts",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "[postid].svelte",
          "filepath": "/posts/[postid].svelte",
          "name": "[postid]",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/posts/[postid].svelte",
          "importPath": "../src/pages/posts/[postid].svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {
            "bundle": false
          },
          "meta": {
            "bundle": false,
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/posts/:postid",
          "id": "_posts__postid",
          "component": () => import('../src/pages/posts/[postid].svelte').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/posts"
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "search.svelte",
      "filepath": "/search.svelte",
      "name": "search",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/search.svelte",
      "importPath": "../src/pages/search.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/search",
      "id": "_search",
      "component": () => import('../src/pages/search.svelte').then(m => m.default)
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "settings",
      "filepath": "/settings",
      "name": "settings",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/settings",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/settings/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/settings/index.svelte",
          "importPath": "../src/pages/settings/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/settings/index",
          "id": "_settings_index",
          "component": () => import('../src/pages/settings/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/settings"
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "users",
      "filepath": "/users",
      "name": "users",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/users",
      "children": [
        {
          "isFile": false,
          "isDir": true,
          "file": "[username]",
          "filepath": "/users/[username]",
          "name": "[username]",
          "ext": "",
          "badExt": false,
          "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/users/[username]",
          "children": [
            {
              "isFile": true,
              "isDir": false,
              "file": "index.svelte",
              "filepath": "/users/[username]/index.svelte",
              "name": "index",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/users/[username]/index.svelte",
              "importPath": "../src/pages/users/[username]/index.svelte",
              "isLayout": false,
              "isReset": false,
              "isIndex": true,
              "isFallback": false,
              "isPage": true,
              "ownMeta": {},
              "meta": {
                "recursive": true,
                "preload": false,
                "prerender": true
              },
              "path": "/users/:username/index",
              "id": "_users__username_index",
              "component": () => import('../src/pages/users/[username]/index.svelte').then(m => m.default)
            },
            {
              "isFile": false,
              "isDir": true,
              "file": "posts",
              "filepath": "/users/[username]/posts",
              "name": "posts",
              "ext": "",
              "badExt": false,
              "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/users/[username]/posts",
              "children": [
                {
                  "isFile": true,
                  "isDir": false,
                  "file": "index.svelte",
                  "filepath": "/users/[username]/posts/index.svelte",
                  "name": "index",
                  "ext": "svelte",
                  "badExt": false,
                  "absolutePath": "C:/Users/wlodz/Downloads/Web-Application-main/Web-Application-main/Meower-F-client-rewritten/src/pages/users/[username]/posts/index.svelte",
                  "importPath": "../src/pages/users/[username]/posts/index.svelte",
                  "isLayout": false,
                  "isReset": false,
                  "isIndex": true,
                  "isFallback": false,
                  "isPage": true,
                  "ownMeta": {},
                  "meta": {
                    "recursive": true,
                    "preload": false,
                    "prerender": true
                  },
                  "path": "/users/:username/posts/index",
                  "id": "_users__username_posts_index",
                  "component": () => import('../src/pages/users/[username]/posts/index.svelte').then(m => m.default)
                }
              ],
              "isLayout": false,
              "isReset": false,
              "isIndex": false,
              "isFallback": false,
              "isPage": false,
              "ownMeta": {},
              "meta": {
                "recursive": true,
                "preload": false,
                "prerender": true
              },
              "path": "/users/:username/posts"
            }
          ],
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": false,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/users/:username"
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/users"
    }
  ],
  "isLayout": true,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "isPage": false,
  "isFile": true,
  "file": "_layout.svelte",
  "ext": "svelte",
  "badExt": false,
  "importPath": "../src/pages/_layout.svelte",
  "meta": {
    "recursive": true,
    "preload": false,
    "prerender": true
  },
  "path": "/",
  "id": "__layout",
  "component": () => import('../src/pages/_layout.svelte').then(m => m.default)
}


export const {tree, routes} = buildClientTree(_tree)

