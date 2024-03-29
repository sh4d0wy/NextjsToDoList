import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)"]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/api/tasks'],
};
 