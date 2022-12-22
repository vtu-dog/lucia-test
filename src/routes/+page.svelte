<script lang="ts">
    import { getUser } from '@lucia-auth/sveltekit/client';
    import type { ClientUser } from '@lucia-auth/sveltekit/client/user';
    import { onMount } from 'svelte';
    import type { Readable } from 'svelte/store';

    let user: Readable<ClientUser>;;
    onMount(() => {
        user = getUser();
    });
</script>

{#if user}
    <h1>Hello {user}</h1>
{:else}
    <h1>Hello stranger</h1>
{/if}
