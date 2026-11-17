# Portafolio — RØQUE

React + Vite + TypeScript + Tailwind v4 + Framer Motion + Supabase. Bilingüe (ES/EN), tema claro/oscuro.

## 1. Local
    pnpm install
    pnpm dev

- Foto: guárdala en `public/avatar.jpg` (también acepta .jpeg, .png, .webp).
- Sin Supabase configurado el sitio funciona igual, mostrando los proyectos de `src/data.ts`.

## 2. Panel de admin (Supabase)
1. Crea un proyecto gratis en supabase.com.
2. SQL Editor > pega y ejecuta `supabase/setup.sql` (tabla, bucket de imágenes y permisos).
3. Authentication > Users > Add user: correo luis.roquetic@gmail.com + contraseña
   (debe ser ESE correo, el SQL solo le da permiso de escritura a él).
4. Authentication > Sign In / Providers > desactiva "Allow new users to sign up".
5. Project Settings > API: copia la Project URL y la anon public key.
6. Copia `.env.example` a `.env` y pega ambos valores. Reinicia `pnpm dev`.
7. Entra a http://localhost:5173/admin, inicia sesión y usa "Importar los 5 proyectos iniciales".

## 3. Vercel
1. Sube la carpeta a GitHub e impórtala en vercel.com (detecta Vite + pnpm).
2. Settings > Environment Variables: agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.
3. Deploy. El panel quedará en https://tu-dominio/admin

## 4. Formulario de contacto
1. Entra a https://web3forms.com, pon tu correo (luis.roquetic@gmail.com) y recibirás una Access Key por email.
2. Pégala como `VITE_WEB3FORMS_KEY` en `.env` (local) y en Vercel > Settings > Environment Variables.
3. Los mensajes del formulario llegan a ese correo. Sin la clave, el botón abre tu cliente de correo con el mensaje listo.
La clave es pública por diseño: solo permite enviar mensajes hacia tu correo.
