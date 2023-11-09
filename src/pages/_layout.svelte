<!-- Meower Svelte, the app itself. -->
<script>
	import ConnectionFailedModal from "../lib/modals/ConnectionFailed.svelte";
	import LoggedOutModal from "../lib/modals/LoggedOut.svelte";
	import AccountCreationBlockedModal from "../lib/modals/LoggedOut.svelte";
	import AccountBannedModal from "../lib/modals/safety/AccountBanned.svelte";
	import Setup from "../lib/Setup.svelte";
	import OOBE from "../lib/OOBE/Main.svelte";
	import Sidebar from "../lib/Sidebar.svelte";
	import Modal from "../lib/Modal.svelte";
	import LoginModal from "../lib/modals/Login.svelte";
	import SignupModal from "../lib/modals/Signup.svelte";
	import BannedModal from "../lib/modals/Banned.svelte";
	import IPBannedModal from "../lib/modals/IPBanned.svelte";
	import DeletePostModal from "../lib/modals/DeletePost.svelte";
	import ReportPostModal from "../lib/modals/ReportPost.svelte";
	import ReportUserModal from "../lib/modals/ReportUser.svelte";
	import GCMemberModal from "../lib/modals/GCMember.svelte";
	import AddMemberModal from "../lib/modals/AddMember.svelte";
	import RemoveMemberModal from "../lib/modals/RemoveMember.svelte";
	import CreateChatModal from "../lib/modals/CreateChat.svelte";
	import SetQuoteModal from "../lib/modals/SetQuote.svelte";
	import ChangePasswordModal from "../lib/modals/ChangePassword.svelte";
	import DeleteAccountModal from "../lib/modals/DeleteAccount.svelte";
	import ErrorModal from "../lib/modals/Error.svelte";
	import LogoutModal from "../lib/modals/Logout.svelte";
	import AnnounceModal from "../lib/modals/Announce.svelte";
	import AddMember2Modal from "../lib/modals/AddMember_2.svelte";
	import AddMemberSearchModal from "../lib/modals/AddMember_Search.svelte";
	import AddMemberModeModal from "../lib/modals/AddMember_Mode.svelte";
	import SearchResultsModal from "../lib/modals/SearchResults.svelte";
	import SwitchThemeModal from "../lib/modals/SwitchTheme.svelte";
	import AddImgModal from "../lib/modals/AddImage.svelte";
	import SwitchBGMSFXModal from "../lib/modals/SwitchBGMSFX.svelte";
	import BasicModal from "../lib/modals/Basic.svelte";
	import DevTooldModal from "../lib/modals/DevTools.svelte";
	import CustomThemeModal from "../customthemes/CustomTheme.svelte";
	import ImageModal from "../lib/modals/Image.svelte";

	import ModPanel from "../lib/ModPanel.svelte";

	import Spinner from "../lib/Spinner.svelte";
	import {link} from "../lib/clmanager.js";
	import {mobile, touch} from "../lib/responsiveness.js";
	import * as BGM from "../lib/BGM.js";

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
		OOBERunning,
		customTheme
	} from "../lib/stores.js";
	import {tick} from "svelte";
	import {stringToTheme} from "../customthemes/CustomTheme.js";
	import {altHeld, shiftHeld, isKeyPressed} from "../lib/keyDetect.js";
	export var layoutTheme;
	var _customTheme
	const themes = {
		"orange":{
			orange: "#f9a636",
			orangeButton: "#f9a636",
			orangeLight: "#ffce8c",
			orangeDark: "#b46d34"
		},
		"blue":{
			orange:                "#4d97ff",
			orangeButton:          "#4d97ff",
			orangeLight:           "#79b7ff",
			orangeDark:            "#3685eb"
		},
		undefined:{
			orange: "#f9a636",
			orangeButton: "#f9a636",
			orangeLight: "#ffce8c",
			orangeDark: "#b46d34"
		}
	}
	function ProcessTheme(theme) {
		if((theme).startsWith("custom:")) {
			return stringToTheme($user.theme);
		} else {
			return themes[$user.theme];
		}
	}
	_customTheme = $customTheme;
	if(($user.theme).startsWith("custom:")) {
		_customTheme = stringToTheme($user.theme);
	} else {
		_customTheme = themes[$user.theme];
	}
	customTheme.set(_customTheme);

	document.addEventListener('keydown',function(keydownEvent){
		if (isKeyPressed["d"] && keydownEvent.altKey && keydownEvent.shiftKey) {
			$modalShown = true
			$modalPage = "devTools"
		};});
	
	// var useCustomTheme = true // wip
	console.log($customTheme)

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

<main
	id="main"
	class:theme-orange={$user.theme === "orange"}
	class:theme-blue={$user.theme === "blue"}
	class:mode-light={$user.mode === true && ($user.name || $screen !== "setup")}
	class:mode-dark={$user.mode === false || !($user.name || $screen !== "setup")}
	class:layout-old={false}
	class:layout-mobile={$mobile}
	class:input-touch={$touch}
	class:input-hover={!$touch}
	style:--orange={$user.name        ? ProcessTheme($user.theme).orange       : null}
	style:--orange-button={$user.name ? ProcessTheme($user.theme).orangeButton : null}
	style:--orange-light={$user.name  ? ProcessTheme($user.theme).orangeLight  : null}
	style:--orange-dark={$user.name   ? ProcessTheme($user.theme).orangeDark   : null}
	style:--theme={$user.theme}

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
	<!-- was {#if $reconnecting}, removed due to errors -->
	{#if false} 
		<Modal>
			<h2 slot="header">Reconnecting...</h2>
			<div slot="default">
				<p>
					Looks like we're having some problems connecting you to
					Meower. Give us a moment and we'll reconnect you as soon as
					possible...
				</p>
			</div>
		</Modal>
	{:else if $modalShown}
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
		{:else if $modalPage === "connectionFailed"}
			<ConnectionFailedModal />
		{:else if $modalPage === "loggedOut"}
			<LoggedOutModal />
		{:else if $modalPage === "accountCreationBlocked"}
			<AccountCreationBlockedModal />
		{:else}
			<ErrorModal />
		{/if}
	{/if}

	{#if $screen === "blank"}
		<div id="blank" />
	{:else if $screen === "setup"}
		<Setup />
	{:else}
		<div class="main-screen">
			<div class="transition" />
			<div class="sidebar-container">
				<Sidebar />
			</div>
			<div class="view">
				{#if $OOBERunning}
					<OOBE />
				{:else}
					<slot />
				{/if}
			</div>
		</div>
	{/if}

	{#if $spinner}
		<div class="spinner-container">
			<Spinner />
		</div>
	{/if}

	<div style="display: none;">
		{layoutTheme}
	</div>
</main>

<style>
	.sidebar-container {
		padding: 0;
		margin-right: 0.5em;
	}
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
		box-sizing: border-box;
	}

	#main.mode-dark {
		--background: #202020;
		--foreground: white;
		--foreground-orange: white;
	}

	.setup.mode-dark {
		background: var(--background)
	}

	.main-screen .view {
		width: 100%;
		overflow: auto;
	}

	.main-screen {
		display: flex;
		flex-direction: row;
		gap: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>
