import { sequence } from "@sveltejs/kit/hooks";

import { auth } from "$common/auth";
import { handleHooks } from "@lucia-auth/sveltekit";

export const handle = sequence(handleHooks(auth));
