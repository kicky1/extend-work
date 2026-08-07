-- SEC-001: Prevent authenticated users from self-upgrading their subscription
-- or tampering with billing/encryption fields.
--
-- The existing "Users can update own profile" RLS policy (USING auth.uid() = id,
-- no WITH CHECK / column restriction) lets any user update ANY column in their
-- own user_profiles row — including subscription_tier, subscription_status,
-- stripe_customer_id, stripe_subscription_id, subscription_period_end and
-- encryption_key_id. That is a billing-bypass / privilege-escalation vector.
--
-- This trigger blocks those columns from being changed by anyone other than the
-- service_role (which the server-side admin client uses for Stripe webhooks and
-- key provisioning). Regular users can still update display_name / avatar_url.

CREATE OR REPLACE FUNCTION public.protect_subscription_columns()
RETURNS TRIGGER AS $$
BEGIN
  -- service_role (server-side admin client) is allowed to manage billing/keys
  IF auth.role() = 'service_role' THEN
    RETURN NEW;
  END IF;

  -- Block any change to billing / encryption columns by non-service-role users
  IF NEW.subscription_tier IS DISTINCT FROM OLD.subscription_tier
     OR NEW.subscription_status IS DISTINCT FROM OLD.subscription_status
     OR NEW.stripe_customer_id IS DISTINCT FROM OLD.stripe_customer_id
     OR NEW.stripe_subscription_id IS DISTINCT FROM OLD.stripe_subscription_id
     OR NEW.subscription_period_end IS DISTINCT FROM OLD.subscription_period_end
     OR NEW.encryption_key_id IS DISTINCT FROM OLD.encryption_key_id THEN
    RAISE EXCEPTION 'Not allowed to modify subscription or encryption fields';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS protect_subscription_columns_trigger ON public.user_profiles;
CREATE TRIGGER protect_subscription_columns_trigger
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_subscription_columns();
