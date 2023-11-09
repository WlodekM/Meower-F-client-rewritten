/**
 * @file Stores, not to be confused with shops or those other stores.
 */

import {writable} from "svelte/store";
import unloadedProfile from "./unloadedprofile.js";

// Used for modal overlay
export const modalStack = writable([]);

// Used for setup screen
export const screen = writable("setup");
export const mainPage = writable("home");
export const setupPage = writable("logo");

// Used for modal overlay
export const modalShown = writable(false);
export const modalPage = writable("");

// Relationships
export const relationships = writable({});

// Chats
export const chats = writable([]);
export const chat = writable({
	_id: "",
	type: 0,
	nickname: "",
	owner: "",
	members: [],
	created: 0,
	last_active: 0,
	deleted: false,
});

// Used for basic modal
export const basicModalTitle = writable("");
export const basicModalDesc = writable("");

// Used for the disconnected screen
export const intentionalDisconnect = writable(false);
export const reconnecting = writable(false);
export const disconnected = writable(false);
export const disconnectReason = writable("");
export const attemptedAutoReconnect = writable(false);

// Last typed timestamp
export const lastTyped = writable(0);

// Current chat stuff
export const chatName = writable("");
export const chatid = writable("");
export const chatMembers = writable([]);
export const chatOwner = writable("");

// User list
export const ulist = writable([]);

// Mod panel
export const userToMod = writable("");
export const modPanelOpen = writable(false);

// Last (blank) clicked
export const postClicked = writable({});
export const profileClicked = writable("");
export const profileClicked_GC = writable("");
export const imageClicked = writable({
	url: "",
	width: 0,
	height: 0,
});
export const announcementToSend = writable("");
export const searchQuery = writable("");
export const searchType = writable("");

// OOBE
export const OOBERunning = writable(false);
export const sidebarLocked = writable(false);
export const OOBEPage = writable(0);

// Image adding stuff
export const postInput = writable("");

// Current auth header
export const authHeader = writable({
	username: null,
	token: null,
});

// The current user profile
export const user = writable({
	name: null,
	lvl: 0,
	unread_inbox: false,
	theme: "orange",
	mode: true,
	sfx: true,
	bgm: false,
	bgm_song: 2,
	layout: "new",
	pfp_data: 1,
	quote: "",
	debug: false,
});

// Spinner thing
export const spinner = writable(false);

// What is this
export const windowStyle = writable({});
export const groupCats = writable(100);

// Custom theme
export const useCustomTheme = writable(false);
export const customTheme = writable({
	"orange": "f9a636",
	"orangeButton": "f9a636",
	"orangeLight": "ffce8c",
	"orangeDark": "b46d34",
	"background": "ffffff",
	"foreground": "000000",
	"foregroundOrange": "ffffff"
});

// User moderation
export const pendingBanState = writable(null);