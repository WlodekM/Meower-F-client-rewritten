<!--
	The home page!
	It features live post updates and a load more button which is pretty nice.
-->
<script>
	import {ulist, user, modalPage, modalShown, profileClicked} from "../lib/stores.js";
	import Container from "../lib/Container.svelte";
	import PostList from "../lib/PostList.svelte";
	import {goto} from "@roxi/routify";
	if(!user) {
		modalPage.set("signup");
		modalShown.set(true);
	}
</script>

<div class="home">
	<Container>
		<h1>Home</h1>
		<div class="overflow">
			{#if $ulist.length == 1}
				You are the only user online.
			{:else if $ulist.length == 0}
				Nobody is online.
			{:else}
				There are currently {$ulist.length} users online (
					{#each $ulist as usr}
						<a href="#{usr}" 
							on:click={() => {
								profileClicked.set(usr);
								$goto(`/users/${usr}`);
							}}
						>{usr}</a>{$ulist.indexOf(usr) == $ulist.length - 1 ? "" : ", "}
					{/each}
				).
			{/if}
		</div>
	</Container>
	<PostList fetchUrl="home" postOrigin="home" canPost={true} />
</div>

<style>
	.home {
		height: 100%;
	}
</style>
