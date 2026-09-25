import { LogIn, LoaderCircle, RotateCw } from 'lucide-react';
import { AppIcon } from '../../components/AppIcon';

interface LoginScreenProps {
  status: 'checking' | 'signedOut' | 'denied';
  message?: string;
  email?: string;
  isSigningIn: boolean;
  onSignIn: () => void;
  onRetry: () => void;
  onSignOut: () => void;
}

export function LoginScreen({ status, message, email, isSigningIn, onSignIn, onRetry, onSignOut }: LoginScreenProps) {
  const busy = status === 'checking' || isSigningIn;

  return (
    <main className="min-h-screen bg-gray-50 text-black flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md border-t-4 border-black pt-8">
        <AppIcon size={64} showBorder className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
        <h1 className="mt-7 text-3xl sm:text-4xl font-black uppercase leading-tight">Dan Images Prompts</h1>
        <p className="mt-3 text-sm font-medium text-gray-600">Entre com uma conta Google autorizada.</p>

        {message && (
          <p role="alert" className="mt-6 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
            {message}
          </p>
        )}

        {status === 'denied' && email && (
          <p className="mt-4 text-sm text-gray-600">Conta atual: <strong>{email}</strong></p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {status !== 'denied' ? (
            <button
              type="button"
              onClick={onSignIn}
              disabled={busy}
              className="inline-flex min-h-12 items-center justify-center gap-3 border-2 border-black bg-black px-5 py-3 text-sm font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-wait disabled:opacity-60"
            >
              {busy ? <LoaderCircle aria-hidden className="h-5 w-5 animate-spin motion-reduce:animate-none" /> : <LogIn aria-hidden className="h-5 w-5" />}
              {busy ? 'Validando acesso' : 'Entrar com Google'}
            </button>
          ) : (
            <button type="button" onClick={onRetry} className="inline-flex min-h-12 items-center gap-2 border-2 border-black bg-black px-5 py-3 text-sm font-black uppercase text-white hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
              <RotateCw aria-hidden className="h-4 w-4" /> Tentar novamente
            </button>
          )}
          {status === 'denied' && (
            <button type="button" onClick={onSignOut} className="min-h-12 border-2 border-black px-5 py-3 text-sm font-black uppercase hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
              Trocar conta
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
