import { auth } from "@/auth";

export default auth((req) => {
  // Allow all requests for now
});

export const config = {
  matcher: [],
};