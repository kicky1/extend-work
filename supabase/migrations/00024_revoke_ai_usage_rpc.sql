-- SEC-004: Restrict the increment_ai_usage RPC to the service_role only.
--
-- The RPC is SECURITY DEFINER and was granted EXECUTE to the `authenticated`
-- role, but it accepts an arbitrary p_user_id without verifying that it matches
-- auth.uid(). Any authenticated user could therefore call it with another
-- user's id to exhaust that user's monthly AI quota (denial of service), or
-- otherwise tamper with usage counters.
--
-- The application only ever calls this RPC from the server-side admin client
-- (supabaseAdmin, which authenticates as service_role) in lib/ai/usage-guard.ts,
-- so removing the `authenticated` grant does not break any legitimate flow.

REVOKE EXECUTE ON FUNCTION public.increment_ai_usage(UUID, DATE, INT, INT) FROM PUBLIC, authenticated;
