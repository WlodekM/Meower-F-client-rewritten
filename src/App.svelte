<!-- Meower Svelte, the app itself. -->
<script>
	import Main from "./screens/Main.svelte";
	import Setup from "./screens/Setup.svelte";

	import Modal from "./lib/Modal.svelte";
	import LoginModal from "./lib/modals/Login.svelte";
	import SignupModal from "./lib/modals/Signup.svelte";
	import BannedModal from "./lib/modals/Banned.svelte";
	import IPBannedModal from "./lib/modals/IPBanned.svelte";
	import DeletePostModal from "./lib/modals/DeletePost.svelte";
	import ReportPostModal from "./lib/modals/ReportPost.svelte";
	import ReportUserModal from "./lib/modals/ReportUser.svelte";
	import GCMemberModal from "./lib/modals/GCMember.svelte";
	import AddMemberModal from "./lib/modals/AddMember.svelte";
	import RemoveMemberModal from "./lib/modals/RemoveMember.svelte";
	import CreateChatModal from "./lib/modals/CreateChat.svelte";
	import SetQuoteModal from "./lib/modals/SetQuote.svelte";
	import ChangePasswordModal from "./lib/modals/ChangePassword.svelte";
	import DeleteAccountModal from "./lib/modals/DeleteAccount.svelte";
	import ErrorModal from "./lib/modals/Error.svelte";
	import LogoutModal from "./lib/modals/Logout.svelte";
	import AnnounceModal from "./lib/modals/Announce.svelte";
	import AddMember2Modal from "./lib/modals/AddMember_2.svelte";
	import AddMemberSearchModal from "./lib/modals/AddMember_Search.svelte";
	import AddMemberModeModal from "./lib/modals/AddMember_Mode.svelte";
	import SearchResultsModal from "./lib/modals/SearchResults.svelte";
	import SwitchThemeModal from "./lib/modals/SwitchTheme.svelte";
	import AddImgModal from "./lib/modals/AddImage.svelte";
	import SwitchBGMSFXModal from "./lib/modals/SwitchBGMSFX.svelte";
	import BasicModal from "./lib/modals/Basic.svelte";
	import DevTooldModal from "./lib/modals/DevTools.svelte";
	import CustomThemeModal from "./customthemes/CustomTheme.svelte";
	import ImageModal from "./lib/modals/Image.svelte";

	import ModPanel from "./lib/ModPanel.svelte";

	import Spinner from "./lib/Spinner.svelte";
	import { link } from "./lib/clmanager.js";
	import { mobile, touch } from "./lib/responsiveness.js";
	import * as BGM from "./lib/BGM.js";

	import {
		screen,
		setupPage,
		modalShown,
		modalPage,
		disconnected,
		disconnectReason,
		userToMod,
		user,
		spinner,
		modPanelOpen,
		customTheme,
	} from "./lib/stores.js";
	import { tick } from "svelte";
	import { stringToTheme } from "./customthemes/CustomTheme.js";
	import { altHeld, shiftHeld, isKeyPressed } from "./lib/keyDetect.js";
	var _customTheme;
	const themes = {
		orange: {
			orange: "#f9a636",
			orangeButton: "#f9a636",
			orangeLight: "#ffce8c",
			orangeDark: "#b46d34",
		},
		blue: {
			orange: "#4d97ff",
			orangeButton: "#4d97ff",
			orangeLight: "#79b7ff",
			orangeDark: "#3685eb",
		},
		undefined: {
			orange: "#f9a636",
			orangeButton: "#f9a636",
			orangeLight: "#ffce8c",
			orangeDark: "#b46d34",
		},
	};

	_customTheme = $customTheme;
	if (!$user.theme) {
		_customTheme = themes[$user.theme];
	} else {
		if ($user.theme.startsWith("custom:")) {
			_customTheme = stringToTheme($user.theme);
		} else {
			_customTheme = themes[$user.theme];
		}
	}
	customTheme.set(_customTheme);

	document.addEventListener("keydown", function (keydownEvent) {
		if (isKeyPressed["d"] && keydownEvent.altKey && keydownEvent.shiftKey) {
			$modalShown = true;
			$modalPage = "devTools";
		}
	});

	$: if ($user.theme) { _customTheme = $customTheme;if ($user.theme.startsWith("custom:")) {	_customTheme = stringToTheme($user.theme);} else {	_customTheme = themes[$user.theme];}customTheme.set(_customTheme)}

	// var useCustomTheme = true // wip
	console.log($user);
</script>

<!--
	in main:
	style:--orange={$user.name ? $customTheme.orange : null}
	style:--orange-button={$user.name ? $customTheme.orangeButton : null}
	style:--orange-light={$user.name ? $customTheme.orangeLight : null}
	style:--orange-dark={$user.name ? $customTheme.orangeDark : null}
	style:--background={$user.name ? $customTheme.background : null}
	style:--foreground={$user.name ? $customTheme.foreground : null}
	style:--foreground-orange={$user.name ? $customTheme.foregroundOrange : null}

	k
-->
{#key $user.theme}
	<main
		id="main"
		class:theme-orange={$user.theme === "orange"}
		class:theme-blue={$user.theme === "blue"}
		class:mode-light={$user.mode === true &&
			($user.name || $screen !== "setup")}
		class:mode-dark={$user.mode === false ||
			!($user.name || $screen !== "setup")}
		class:layout-old={$user.layout === "old"}
		class:layout-mobile={$mobile}
		class:input-touch={$touch}
		class:input-hover={!$touch}
		style:--orange={$user.name ? $customTheme.orange : null}
		style:--orange-button={$user.name ? $customTheme.orangeButton : null}
		style:--orange-light={$user.name ? $customTheme.orangeLight : null}
		style:--orange-dark={$user.name ? $customTheme.orangeDark : null}
		on:mousedown={() => BGM.canPlayNow()}
		on:keydown={() => BGM.canPlayNow()}
	>
		{#if $modPanelOpen}
			<div class="mod-panel">
				<Modal
					on:close={() => {
						$modPanelOpen = false;
						$userToMod = "";
					}}
				>
					<div slot="header">
						<h1>Moderation Panel</h1>
					</div>
					<ModPanel />
				</Modal>
			</div>
		{/if}

		{#if $disconnected}
			<Modal>
				<h2 slot="header">Me-owch.</h2>
				<div slot="default">
					<p>
						{#if $disconnectReason === ""}
							Something went wrong and the connection to Meower
							was lost.
						{:else if $disconnectReason === "Failed to load userdata"}
							An unexpected error occurred while trying to load
							your userdata! Check console for more information.
						{:else if $disconnectReason === "E:119 | IP Blocked"}
							The server has blocked your IP address ({link.ip}).
						{:else if $disconnectReason == "E:110 | ID conflict"}
							There has been a hiccup! Looks like you logged into
							Meower from another device.
							<br /><br />
							Please check any devices currently logged into Meower
							and try again.
						{:else if $disconnectReason == "E:018 | Account Banned"}
							You have been banned by a moderator.
						{:else if $disconnectReason == "E:020 | Kicked"}
							You have been kicked by a moderator.
						{:else}
							We ran into an error trying to connect to the
							server.
							<pre><code>{$disconnectReason}</code></pre>
						{/if}
					</p>
					<button
						on:click={async () => {
							screen.set("setup");
							disconnected.set(false);
							await tick();
							setupPage.set("reconnect");
						}}>Reconnect</button
					>
				</div>
			</Modal>
		{/if}

		{#if $modalShown}
			<!-- Login, signup -->
			{#if $modalPage === "login"}
				<LoginModal />
			{:else if $modalPage === "signup"}
				<SignupModal />
				<!-- Bans -->
			{:else if $modalPage === "banned"}
				<BannedModal />
			{:else if $modalPage === "ipBanned"}
				<IPBannedModal />
				<!-- Confirmations -->
			{:else if $modalPage === "deletePost"}
				<DeletePostModal />
			{:else if $modalPage === "reportPost"}
				<ReportPostModal />
			{:else if $modalPage === "reportUser"}
				<ReportUserModal />
			{:else if $modalPage === "searchResults"}
				<SearchResultsModal />
			{:else if $modalPage === "deleteAccount"}
				<DeleteAccountModal />
			{:else if $modalPage === "logout"}
				<LogoutModal />
			{:else if $modalPage === "announce"}
				<AnnounceModal />
				<!-- Text inputs -->
			{:else if $modalPage === "createChat"}
				<CreateChatModal />
			{:else if $modalPage === "setQuote"}
				<SetQuoteModal />
			{:else if $modalPage === "addImg"}
				<AddImgModal />
			{:else if $modalPage === "changePassword"}
				<ChangePasswordModal />
				<!-- Group chats -->
			{:else if $modalPage === "gcMember"}
				<GCMemberModal />
			{:else if $modalPage === "addMember"}
				<AddMemberModal />
			{:else if $modalPage === "addMember2"}
				<AddMember2Modal />
			{:else if $modalPage === "addMemberSearch"}
				<AddMemberSearchModal />
			{:else if $modalPage === "addMemberMode"}
				<AddMemberModeModal />
			{:else if $modalPage === "removeMember"}
				<RemoveMemberModal />
				<!-- Misc -->
			{:else if $modalPage === "switchTheme"}
				<SwitchThemeModal />
			{:else if $modalPage === "switchBGM"}
				<SwitchBGMSFXModal />
			{:else if $modalPage === "BasicModal"}
				<BasicModal />
			{:else if $modalPage === "devTools"}
				<DevTooldModal /> <!-- wip dev tools -->
			{:else if $modalPage === "customTheme"}
				<CustomThemeModal />
			{:else if $modalPage === "image"}
				<ImageModal />
			{:else}
				<ErrorModal />
			{/if}
		{/if}

		{#if $screen === "setup"}
			<Setup />
		{:else}
			<Main />
		{/if}

		{#if $spinner}
			<div class="spinner-container">
				<Spinner />
			</div>
		{/if}
	</main>
{/key}

<style>
	.spinner-container {
		position: fixed;
		right: 27px;
		bottom: 25px;
		z-index: 10000;
	}

	#main {
		width: 100%;
		height: 100%;

		font-family: Simvoni, sans-serif;

		--orange: #f9a636;
		--orange-button: var(--orange);
		--orange-light: #ffce8c;
		--orange-dark: #b46d34;
		--orange-scrollbar-back: #a15d04;
		--background: white;
		--foreground: black;
		--foreground-orange: white;

		--pfp-bg: white;
		--pfp-outline: #d9d9d9;

		background-color: var(--background);
		color: var(--foreground);
		scrollbar-color: var(--orange) var(--orange-scrollbar-back);
		font-size: 15pt;
	}

	#main.mode-dark {
		--background: #202020;
		--foreground: white;
		--foreground-orange: white;
	}

	.setup.mode-dark {
		background: var(--background);
	}
</style>
