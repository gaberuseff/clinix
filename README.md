# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Google Login (Existing Auth Users Only)

This project expects Google login to be allowed only for emails already present in Supabase Auth.

Create this SQL function in your Supabase SQL editor so the client can safely check if an email exists in `auth.users` without exposing service role keys:

```sql
create or replace function public.is_auth_email_registered(p_email text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
	return exists (
		select 1
		from auth.users
		where lower(email) = lower(trim(p_email))
	);
end;
$$;

revoke all on function public.is_auth_email_registered(text) from public;
grant execute on function public.is_auth_email_registered(text) to anon, authenticated;
```

Recommended Supabase Auth settings for strict login-only behavior:

- Disable new user signups in Auth settings.
- Keep Google enabled as an auth provider.
- Add your app callback URL: `http://localhost:5173/auth/callback` (and production callback URL).
