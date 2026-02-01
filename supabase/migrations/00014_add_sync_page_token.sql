-- Add sync_page_token column to user_email_accounts for pagination when fetching more emails
ALTER TABLE public.user_email_accounts
ADD COLUMN IF NOT EXISTS sync_page_token TEXT;

COMMENT ON COLUMN public.user_email_accounts.sync_page_token IS 'Page token for fetching next batch of emails from provider (Gmail/Outlook)';
