import NextAuth from "next-auth";
import { cache } from "react";

import { authConfig } from "./config";

const { auth: _auth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(_auth);

export { auth, handlers, signIn, signOut };
