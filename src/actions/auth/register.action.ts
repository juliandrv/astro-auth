import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError,
} from 'firebase/auth';
import { firebase } from '@/firebase/config';

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async (
    { name, email, password, remember_me },
    { cookies }
  ) => {
    // Cookies
    if (remember_me) {
      cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        path: '/',
      });
    } else {
      cookies.delete('email', {
        path: '/',
      });
    }

    // Creación de usuario en Firebase Auth
    try {
      const user = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      // Actualizar el nombre del usuario (displayName)
      updateProfile(firebase.auth.currentUser!, {
        displayName: name,
      });

      // Verificar el correo electrónico
      await sendEmailVerification(firebase.auth.currentUser!, {
        url: `${
          import.meta.env.WEBSITE_URL
        }/protected?emailVerified=true`,
      });

      return JSON.stringify(user);
    } catch (error) {
      const firebaseError = error as AuthError;
      if (firebaseError.code === 'auth/email-already-in-use') {
        throw new Error('El correo ya está en uso');
      }
      throw new Error('Algo salió mal');
    }
  },
});
