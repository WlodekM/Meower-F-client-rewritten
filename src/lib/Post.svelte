<!-- A post. Profile pictures not appearing while not logged in is intentional. -->
<script>
	import Container from "../lib/Container.svelte";
	import PFP from "../lib/PFP.svelte";
	import FormattedDate from "./FormattedDate.svelte";
	import Badge from "./Badge.svelte";
	import ReplyPost from "./ReplyPost.svelte";
	import Repost from "./Repost.svelte";
	import MarkdownIt from "markdown-it";
	import twemoji from "twemoji";
	import {autoresize} from "svelte-textarea-autoresize";

	import LiText from "./LiText.svelte";

	import {
		profileClicked,
		postClicked,
		user,
		chat,
		ulist,
		mainPage as page,
		modalShown,
		modalPage,
		imageClicked,
		authHeader,
	} from "../lib/stores.js";
	import { shiftHeld } from "../lib/keyDetect.js";
	import * as modals from "../lib/modals.js";
	import * as clm from "../lib/clmanager.js";
	//
	import {
		default as loadProfile,
		profileCache,
	} from "../lib/loadProfile.js";

	import { onMount, tick } from "svelte";
	import {apiUrl, encodeApiURLParams} from "../lib/urls.js";
	import {goto} from "@roxi/routify";
	import ContextMenu, { Item, Divider, Settings } from "svelte-contextmenu";
	let myMenu;

	export let post = {};
	export let buttons = true;
	export let input = null;
	export let canDoActions = true;
	var postid = post.post_id

	let bridged = false;
	let webhook = false;
	let dev = false;
	let frien = false;

	let editing = false;
	let editError = "";
	let editContentInput, editSaveButton;

	let deleteButton;

	let adminDeleteButton, adminRestoreButton;

	let images = [];

	post.unformatedcontent = post.content
	onMount(uncensor)
	async function uncensor() {
		if(post.content.includes("****")) {
			//send request to api
			console.log("censored detected")
			console.log(post.post_id)
			let path = `posts?`;
			if (encodeApiURLParams) path = encodeURIComponent(path);
			const resp = await fetch(`${apiUrl}${path}` + new URLSearchParams({
				id: post.post_id
			}));
			if (!resp.ok) {
				console.log(resp)
				throw new Error("Response code is not OK; code is " + resp.status);
			}
			const json = await resp.json();
			if(json.unfiltered_p) {
				post.content = json.unfiltered_p
			}
			console.log(json);
		}
	}

	// IP grabber sites exist, and I don't know if hosting a proxy is feasible
	// WARNING: Put a / at the end of each URL so it can't be bypassed
	// (like https://http.meower.org@evilsite.bad)!
	const IMAGE_HOST_WHITELIST = [
		// Meower
		"https://http.meower.org/",
		"https://assets.meower.org/",
		"https://forums.meower.org/",
		"https://go.meower.org/", // not everyone can add urls to go.meower.org, should be fine
		"https://nc.meower.org/",

		// cubeupload
		"https://u.cubeupload.com/",
		"https://cubeupload.com/",

		// ImgBB
		"https://i.ibb.co/",

		// Tenor
		"https://media.tenor.com/",
		"https://tenor.com/",
		"https://c.tenor.com/",

		// Scratch (assets file uploading exists)
		"https://assets.scratch.mit.edu/",
		"https://cdn2.scratch.mit.edu/",
		"https://cdn.scratch.mit.edu/",
		"https://uploads.scratch.mit.edu/",

		// Discord
		"https://cdn.discordapp.com/",
		"https://discord.com/",
	];

	// TODO: make bridged tag a setting

	/**
	 * Initialize this post's special behavior (user profile, images)).
	 */
	function initPostUser() {
		if (!post.user) return;

		if (post.content.includes(":")) {
			bridged =
				post.user === "Discord" ||
				post.user === "revolt" ||
				post.user === "Revower";
			webhook = post.user == "Webhooks";
		}

		if (bridged || webhook) {
			post.user = post.content.split(": ")[0];
			post.content = post.content.slice(post.content.indexOf(": ") + 1);
		}
		if (
			[
				"wlodekm3",
				"wlodekm2",
				"wlodekm4",
				"wlodekm5",
				"wlodekm",
			].includes(post.user.toLowerCase())
		) {
			// Will add more ppl if someone helps me make this client
			dev = true;
		}
		if (["3r1s_s"].includes(post.user.toLowerCase())) {
			frien = true;
		}

		// Match image syntax
		// ([title: https://url])
		const iterator = post.unformatedcontent.matchAll(
			/\[([^\]]+?): (https:\/\/[^\]]+?)\]/gs
		);
		images = [];
		while (true) {
			const result = iterator.next();
			if (result.done) break;

			try {
				new URL(result.value[2]);
			} catch (e) {
				continue;
			}

			if (
				!IMAGE_HOST_WHITELIST.some((o) =>
					result.value[2].toLowerCase().startsWith(o.toLowerCase())
				)
			) {console.log(`image host not whitelisted ${result.value[2].toLowerCase()}`);return}

			images.push({
				title: result.value[1],
				url: result.value[2],
			});
			// Prevent flooding
			if (images.length >= 3) break;
		}
		images = images;

		if (!webhook) loadProfile(post.user);
	}
	onMount(initPostUser);

	function addFancyElements(content) {
		let newContent = format(markdown(deHTML(content)))
		newContent = newContent.replaceAll("<p>", "<span>")
		newContent = newContent.replaceAll("</p>", "</span>")
		return newContent
	}

	function format(input) {
		let out = input;
		let formating = {
			b:     "b",
			i:     "i",
			u:     "ins",
			bq:    "blockquote",
			s:     "strike",
			list:  "ul",
			item:  "li",
			table: "table",
			tr:    "tr",
			th:    "th",
			data:  "td",
		};
		Object.keys(formating).forEach(function (key) {
			out = out.replaceAll(`${"[" + key + "]"}`, `<${formating[key]}>`);
			out = out.replaceAll(`${"[/" + key + "]"}`, `</${formating[key]}>`);
		});
		return out;
	}
	function markdown(input) {
		try {
			const md = new MarkdownIt("default", {
				breaks: true,
				linkify: true,
				typographer:  true,
			});
			md.linkify.add("@", {
				validate: function (text, pos) {
					var tail = text.slice(pos);
					return tail.match(/[a-zA-Z0-9-_]{1,20}/gs)[0].length;
				},
				normalize: function (match) {
					match.url = window.location.host + "/users/" + match.url.replace(/^@/, '');
				}
			});
			const tokens = md.parse(input.replaceAll(/\[([^\]]+?): (https:\/\/[^\]]+?)\]/gs, "").replaceAll(/\*\*\*\*/gs, "\\*\\*\\*\\*"));
			for (const token of tokens) {
				if (token.children) {
					for (const childToken of token.children) {
						if (childToken.type === "image") {
							const srcPos = childToken.attrs.findIndex(attr => attr[0] === "src");
							if (!IMAGE_HOST_WHITELIST.some(o =>
								childToken.attrs[srcPos][1].toLowerCase().startsWith(o.toLowerCase())
							)) {
								childToken.attrs[srcPos][1] = "about:blank";
								console.log(childToken);
							}
						}
						if (childToken.type === "link_open") {
							const href = childToken.attrs.find(attr => attr[0] === "href")[1];
							childToken.attrs.push(["onclick", `return confirmLink('${href}')`]);
						}
					}
				}
			}
			input = md.renderer.render(tokens, md.options);

			// add quote containers to blockquotes (although, quotes are currently broken)
			input = input.replaceAll(
				/<blockquote>(.+?)<\/blockquote>/gms,
				'<div class="quote-container"><blockquote>$1</blockquote></div>'
			);
		} catch (e) {
			console.error(`Failed to load markdown on ${post.post_id}: ${e}`);
		}

		// twemoji
		input = twemoji.parse(input, {
			folder: "svg",
			ext: ".svg",
			size: 20,
		});
		return input
	}
	function deHTML(input) {
		let dhout = input;
		dhout = dhout.replaceAll("&", "&amp;");
		dhout = dhout.replaceAll("<", "&lt;");
		dhout = dhout.replaceAll(">", "&gt;");
		dhout = dhout.replaceAll('"', "&quot;");
		dhout = dhout.replaceAll("'", "&apos;");
		return dhout;
	}
	function linkify(inputText) {
		var replacedText, replacePattern1, replacePattern2, replacePattern3;

		//URLs starting with http://, https://, or ftp://
		replacePattern1 =
			/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		replacedText = inputText.replace(
			replacePattern1,
			'<a href="$1" target="_blank">$1</a>'
		);

		//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
		replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		replacedText = replacedText.replace(
			replacePattern2,
			'$1<a href="http://$2" target="_blank">$2</a>'
		);

		//Change email addresses to mailto:: links.
		replacePattern3 =
			/(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
		replacedText = replacedText.replace(
			replacePattern3,
			'<a href="mailto:$1">$1</a>'
		);

		return replacedText;
	}

	$: noPFP =
		post.user === "Notification" ||
		post.user.startsWith("Notification to ") ||
		post.user === "Announcement" ||
		post.user === "Server" ||
		webhook;
	console.log(JSON.stringify(post));
	function openImage(url) {
		$modalShown = true;
		$modalPage = "image";
		$imageClicked = url;
	}
	
	console.log(post.content)
</script>

<Container>
	<!-- on:contextmenu={(e) => {
		console.log("Activating context menu");
		myMenu.show(e);
	  }} -->
	<div >
	<div class="post-header">
		<div class="settings-controls">
			<!-- {#if adminView && hasPermission(adminPermissions.DELETE_POSTS)}
				{#if post.isDeleted}
					<button
						class="circle restore"
						title="Restore post"
						bind:this={adminRestoreButton}
						on:click={adminRestore}
					/>
				{:else}
					<button
						class="circle trash"
						title="Delete post"
						bind:this={adminDeleteButton}
						on:click={adminDelete}
					/>
				{/if}
			{:else if !adminView} -->
				<!-- {#if !editing && hasPermission(adminPermissions.VIEW_POSTS)}
					<button
						class="circle admin"
						on:click={() =>
							modals.showModal("moderatePost", {
								postid: post.post_id,
							})}
					/>
				{/if} -->
				{#if input && !input.disabled && !noPFP && !editing}
					{#if post.user === $user.name}
						<button
							class="circle pen"
							on:click={async () => {
								editError = "";
								editing = true;
								await tick();
								editContentInput.value =
									post.unfiltered_content || post.content;
								editContentInput.focus();
								autoresize(editContentInput);
							}}
						/>
					{/if}
					<button
						class="circle reply"
						on:click={() => {
							let existingText = input.value;

							const mentionRegex =
								/^@\w+\s\[\w+-\w+-\w+-\w+-\w+\]\s*/i;
							const mention = `@${post.user} [${post.post_id}] `;

							if (mentionRegex.test(existingText)) {
								input.value = existingText
									.trim()
									.replace(mentionRegex, mention);
							} else {
								input.value = mention + existingText.trim();
							}

							input.focus();
						}}
					/>
					{#if post.user === $user.name || (post.post_origin === $chat._id && $chat.owner === $user.name)}
						<button
							class="circle trash"
							bind:this={deleteButton}
							on:click={async () => {
								if (shiftHeld) {
									deleteButton.disabled = true;
									try {
										const resp = await fetch(
											`${apiUrl}posts?id=${post.post_id}`,
											{
												method: "DELETE",
												headers: $authHeader,
											}
										);
										if (!resp.ok) {
											if (resp.status === 429) {
												throw new Error(
													"Too many requests! Try again later."
												);
											}
											throw new Error(
												"Response code is not OK; code is " +
													resp.status
											);
										}
									} catch (e) {
										editError = e;
									}
									deleteButton.disabled = false;
								} else {
									modals.showModal("deletePost", {
										post,
									});
								}
							}}
						/>
					{:else}
						<button
							class="circle report"
							on:click={() =>
								modals.showModal("reportPost", {post})}
						/>
					{/if}
				{/if}
			<!-- {/if} -->
		</div>
		<button
			class="pfp"
			on:click={async () => {
				console.log(noPFP, `users/${post.user}`)
				if (noPFP) return;
				await tick();
				profileClicked.set(post.user);
				$goto(`/users/${post.user}`);
			}}
		>
			{#await noPFP ? Promise.resolve(true) : loadProfile(post.user)}
				<PFP
					icon={-2}
					alt="{post.user}'s profile picture"
					online={$ulist.includes(post.user)}
				/>
			{:then profile}
				<PFP
					icon={noPFP
						? post.user === "Server"
							? 102
							: post.post_origin === "inbox" &&
							  (post.user === "Announcement" ||
									post.user === "Notification" ||
									post.user.startsWith("Notification to"))
							? 101
							: -2
							: profile.pfp_data}
					alt="{post.user}'s profile picture"
					online={$ulist.includes(post.user)}
				/>
			{:catch}
				<PFP
					icon={-2}
					alt="{post.user}'s profile picture"
					online={$ulist.includes(post.user)}
				/>
			{/await}
		</button>
		<div class="creatordate">
			<div class="creator">
				<h2>
					<LiText text={post.user} />
				</h2>

				{#if bridged}
					<Badge
						text="BRIDGED"
						title="This post is bridged from an external service by a bot"
					/>
				{/if}

				{#if webhook}
					<Badge
						text="WEBHOOK"
						title="This post was posted by the @Webhooks bot. The username may not mean the user actually posted it!"
					/>
				{/if}

				{#if dev}
					<Badge
						text="DEV"
						title="This post was made by a developer of F client"
					/>
				{/if}

				{#if frien}
					<Badge
						text="Frien :>"
						title="This post was made by a user that is a friend of the creator of this client."
					/>
				{/if}

				<!-- disabled until proper bot badges are added
				{#if post.isvbot && !webhook}
					<Badge
						text="BOT"
						title="This bot has been verified"
						checkmark={true}
					/>
				{/if}

				{#if post.isuvbot && !webhook}
					<Badge text="BOT" title="This bot has not been verified" />
				{/if}
				-->
			</div>

			<FormattedDate date={post.date} />
			{#if post.isDeleted}
				<i>(deleted)</i>
			{/if}
		</div>
	</div>
	{#if editing}
		<textarea
			type="text"
			class="white"
			name="input"
			autocomplete="off"
			maxlength="4000"
			rows="1"
			bind:this={editContentInput}
			use:autoresize
			on:keydown={event => {
				if (event.key == "Enter" && !shiftHeld) {
					event.preventDefault();
					if (!editSaveButton.disabled) editSaveButton.click();
				} else if (event.key == "Escape") {
					editing = false;
				}
			}}
		/>
		<div style="display: flex; justify-content: space-between;">
			<button on:click={() => (editing = false)}>Cancel</button>
			<button
				bind:this={editSaveButton}
				on:click={async () => {
					if (editContentInput.value.trim() === "") {
						return;
					}

					editing = false;
					try {
						const resp = await fetch(
							`${apiUrl}posts?id=${post.post_id}`,
							{
								method: "PATCH",
								headers: {
									"Content-Type": "application/json",
									...$authHeader,
								},
								body: JSON.stringify({
									content: editContentInput.value,
								}),
							}
						);
						if (!resp.ok) {
							if (resp.status === 429) {
								throw new Error(
									"Too many requests! Try again later."
								);
							}
							throw new Error(
								"Response code is not OK; code is " +
									resp.status
							);
						}
					} catch (e) {
						editError = e;
					}
				}}>Save</button
			>
		</div>
	{:else if post.content.search(/^\[\w+-\w+-\w+-\w+-\w+\]\s*/i) != -1 || (post.content.search(/^@\w+\s\[\w+-\w+-\w+-\w+-\w+\]\s*/i) != -1)}
		<br />
		{#if post.content.search(/^@\w+\s\[\w+-\w+-\w+-\w+-\w+\]\s*/i) != -1}
			<ReplyPost
				post={(post.content
					.split(" ")
					.splice(1, 1)[0]
					.replace("[", "")
					.replace("]", ""))}
			/>
			<p class="post-content">
				{@html post.content
					.split(/^@\w+\s\[\w+-\w+-\w+-\w+-\w+\]\s*/i)
					.join(" ")}
			</p>
		{:else}
			<Repost
				post={(post.content
					.split(" ")[0]
					.replace("[", "")
					.replace("]", ""))}
			/>
			<p class="post-content">
				{@html addFancyElements(post.content.split(/^\[\w+-\w+-\w+-\w+-\w+\]\s*/i).join(" "))}
			</p>
		{/if}
	{:else}
		<p class="post-content">
			{@html addFancyElements(post.content)}
		</p>
	{/if}
	<div class="post-images">
		{#each images as { title, url }}
			{#if url.endsWith(".mp4")}
				<a href="#img" on:click={() => openImage({ url })}>
					<embed
						type="vido/mp4"
						src={url}
						title={title}
						class="post-image"
					/>
				</a>
			{:else if url.endsWith(".webm")}
				<a href="#img" on:click={() => openImage({ url })}>
					<embed
						type="vido/webm"
						src={url}
						title={title}
						class="post-image"
					/>
				</a>
			{:else}
				<a href="#img" on:click={() => openImage({ url })}>
					<img
						src={url}
						alt={title}
						{title}
						class="post-image"
					/>
				</a>
			{/if}
			{/each}
		</div>
	</div>
	<!-- <ContextMenu bind:this={myMenu}>
		<Item>Reply</Item>
		{#if typeof window.getSelection != "undefined"} 
			<Item on:click={() => {document.execCommand('copy');}}>Copy Text</Item>
		{/if}
		<Divider />
		<Item>Copy Message ID</Item>
	</ContextMenu> -->
</Container>

<style>
	.pfp {
		margin-right: 0.2em;
		padding: 0;
		border: none;
		background: none !important;
		color: inherit;
	}
	.post-header {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		max-width: 100%;
	}

	.creatordate {
		margin-left: 0.5em;
	}
	.creator {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5em;
	}
	.creator h2 {
		font-size: 200%;
		margin: 0;
		overflow-wrap: anywhere;
	}
	:global(main.input-hover) .pfp:hover:not(:active) :global(.pfp),
	:global(main.input-touch) .pfp:active :global(.pfp),
	.pfp:focus-visible :global(.pfp) {
		transform: scale(1.1);
	}
	.post-content {
		white-space: pre-wrap;
	}
	.settings-controls {
		position: absolute;
		top: 0.25em;
		right: 0.25em;
	}
	button.circle {
		border: none;
		margin: 0;
		margin-left: 0.125em;
	}

	.post-image {
		max-height: 12em;
		max-width: 100%;
	}

	.post-images {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25em;
	}

	:global(blockquote) {
		border-left: 3px solid var(--orange);
		margin: 0.25em 0.25em 0.25em 0;
		padding: 0.25em 0.25em 0.25em 0.625em;
		background-color: rgba(255, 255, 255, 0.05);
		padding-right: 0;
		margin-right: 0.4em;
		border-radius: 0.15em;
	}

	:global(table),
	:global(td),
	:global(th) {
		border: 2px var(--orange) solid;
		border-radius: 4px;
	}

	:global(th),
	:global(td) {
		padding-inline-start: 1px;
	}
</style>