/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces

/// <reference types="@sveltejs/kit" />
declare namespace App {
  interface Locals {
    validate: import("@lucia-auth/sveltekit").Validate;
    validateUser: import("@lucia-auth/sveltekit").ValidateUser;
    setSession: import("@lucia-auth/sveltekit").SetSession;
  }
}

/// <reference types="lucia-auth" />
declare namespace Lucia {
  type Auth = import("$common/auth").Auth;
  type UserAttributes = {
    login: string;
    nickname: string;
    role: string;
  };
}
