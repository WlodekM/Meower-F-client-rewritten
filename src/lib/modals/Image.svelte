<script>
    import Modal from "../Modal.svelte";

    import { modalShown, modalPage, imageClicked } from "../stores.js";
    console.log($imageClicked.url);
</script>

<Modal
    on:close={() => {
        $modalShown = false;
    }}
>
    <center slot="header">
        <img src={$imageClicked.url} alt="An embed viewed in full screen" title="image.png" height="100%" />
    </center>
    <center slot="default">
        <a href={$imageClicked.url} target="black" style="max-width: 100%"
            >Open the original image</a
        >
    </center>
</Modal>

<style>
    :global(.modal) {
        max-height: 100% !important;
        min-width: calc(100vw - 8em) !important;
    }
</style>
