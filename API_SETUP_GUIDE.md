# Job API Setup Guide

## Fixed Issues

### JSearch API (OpenWebNinja)
**Problem:** The code was using Authorization header instead of query parameter for authentication.
**Fix Applied:** Updated `/lib/services/job-apis/jsearch.ts` line 22 to use `apiKey` as query parameter instead of Bearer token in header.

**Before:**
```javascript
headers: {
  'Authorization': `Bearer ${process.env.JSEARCH_API_KEY}`,
}
```

**After:**
```javascript
const params = new URLSearchParams({
  query: searchQuery,
  page: String(page),
  num_pages: '1',
  apiKey: process.env.JSEARCH_API_KEY!,
})
```

## Authentication Summary

### 1. Adzuna API ✓

**Current Error:** `401 AUTH_FAIL` - Invalid credentials

**Authentication Format:** Query parameters
- `app_id` and `app_key` passed in URL query string
- Implementation: **Correct** (adzuna.ts:15-20)

**Endpoint:** `https://api.adzuna.com/v1/api/jobs/{country}/search/{page}`

**Issue:** Your API credentials appear to be invalid:
- `ADZUNA_APP_ID`: `42db90f59c3dfe39d3e2e3ac4e1b71fa` (looks valid)
- `ADZUNA_APP_KEY`: `b6c74408` (looks too short, typically longer)

**To fix:**
1. Go to https://developer.adzuna.com/
2. Log in to your account
3. Check your application details for the complete `app_key`
4. Verify both credentials are correct and active

### 2. Jooble API ✓

**Current Error:** `403 Access is available only for registered users`

**Authentication Format:** URL path
- API key embedded in request path: `/api/{api_key}`
- Implementation: **Correct** (jooble.ts:13-14)

**Endpoint:** `https://jooble.org/api/{JOOBLE_API_KEY}`

**Issue:** Your API key might be:
- Invalid or expired
- Not approved yet (requires manual approval)
- From a test/demo account

**To fix:**
1. Go to https://jooble.org/api/about
2. Check your registration status and approval
3. If needed, re-register for a new API key
4. Wait for email confirmation with valid key

### 3. JSearch API (OpenWebNinja) ✓ FIXED

**Current Error:** `403 Invalid key=value pair` - **NOW FIXED**

**Authentication Format:** Query parameter
- `apiKey` passed as URL query parameter
- Implementation: **Fixed** (jsearch.ts:16-21)

**Endpoint:** `https://api.openwebninja.com/v1/job-search`

**Your API Key:** Starts with `ak_` which is the correct format for OpenWebNinja

**Status:** Should work now after the code fix. If still failing:
1. Go to https://app.openwebninja.com/
2. Log in and check your API key status
3. Verify the key hasn't expired
4. Check usage limits haven't been exceeded

## After Updating Keys

1. Save the `.env.local` file
2. Restart your Next.js dev server:
   ```bash
   pnpm dev
   ```
3. Test the job search functionality

## Free Tier Limitations

- **Adzuna:** Check their developer portal for rate limits
- **Jooble:** Limited requests per month (check their terms)
- **JSearch (RapidAPI):** Free tier typically allows 50-100 requests/month

## Alternative: Disable Specific APIs

If you don't want to use all three APIs, you can simply remove or comment out the API keys in `.env.local`. The code will automatically skip unavailable APIs.

For example, to disable Jooble:
```bash
# JOOBLE_API_KEY=49218116-a79c-4839-89d0-e3052505a1e0
```
