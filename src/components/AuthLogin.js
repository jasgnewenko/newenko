import React, { useState, useEffect } from 'react';

const AuthLogin = ({ onLogin, onAttemptLogin, notifyAdminOfLockout }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryMessage, setRecoveryMessage] = useState('');

  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  const [loginAttempts, setLoginAttempts] = useState({});
  const MAX_LOGIN_ATTEMPTS = 3;

  const [recoveryAttempts, setRecoveryAttempts] = useState({});
  const MAX_RECOVERY_ATTEMPTS = 3;

  useEffect(() => {
    generateCaptcha();
  }, [showForgotPassword]);

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(result);
    setCaptchaInput('');
    setCaptchaError('');
  };

  const validateCaptcha = () => {
    if (captchaInput === captchaValue) {
      return true;
    } else {
      setCaptchaError('Captcha incorrecto. Intenta de nuevo.');
      generateCaptcha();
      return false;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const currentAttempts = loginAttempts[email] || 0;
    if (currentAttempts >= MAX_LOGIN_ATTEMPTS) {
      setError(`Tu cuenta está bloqueada. Contacta al administrador para desbloquearla.`);
      return;
    }

    let userFound = false;
    let userRole = '';
    if ((email === 'salinasguajardojuan@gmail.com' && password === '17812173juan@') ||
        (email === 'newenko2022@gmail.com' && password === '1234abcd@')) {
      userFound = true;
      userRole = 'Administrador';
    } else if (email === 'vendedor@newenko.com' && password === 'vendedor123') {
      userFound = true;
      userRole = 'Vendedor';
    } else if (email === 'repartidor@newenko.com' && password === 'repartidor123') {
      userFound = true;
      userRole = 'Repartidor';
    }

    if (userFound) {
      onAttemptLogin(email, true, (isBlocked) => {
        if (isBlocked) {
          setError(`Tu cuenta está bloqueada por el administrador. Contacta para desbloquearla.`);
          return;
        }
        setLoginAttempts(prev => ({ ...prev, [email]: 0 }));
        onLogin({ email, role: userRole });
      });
    } else {
      setLoginAttempts(prev => ({ ...prev, [email]: (prev[email] || 0) + 1 }));
      const newAttempts = (loginAttempts[email] || 0) + 1;
      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        onAttemptLogin(email, false, () => {});
        notifyAdminOfLockout(email, 'login');
        setError(`Demasiados intentos fallidos. Tu cuenta ha sido bloqueada. Contacta al administrador.`);
      } else {
        setError(`Email o contraseña incorrectos. Te quedan ${MAX_LOGIN_ATTEMPTS - newAttempts} intentos.`);
      }
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setRecoveryMessage('');
    setError('');
    setCaptchaError('');

    const currentRecoveryAttempts = recoveryAttempts[recoveryEmail] || 0;
    if (currentRecoveryAttempts >= MAX_RECOVERY_ATTEMPTS) {
      setError(`Demasiados intentos de recuperación fallidos para este email. Intenta de nuevo más tarde.`);
      return;
    }

    if (!validateCaptcha()) {
      setRecoveryAttempts(prev => ({ ...prev, [recoveryEmail]: (prev[recoveryEmail] || 0) + 1 }));
      const newRecoveryAttempts = (recoveryAttempts[recoveryEmail] || 0) + 1;
      if (newRecoveryAttempts >= MAX_RECOVERY_ATTEMPTS) {
        setError(`Demasiados intentos de captcha fallidos. Este email está bloqueado para recuperación.`);
        notifyAdminOfLockout(recoveryEmail, 'recovery');
      } else {
        setError(`Captcha incorrecto. Te quedan ${MAX_RECOVERY_ATTEMPTS - newRecoveryAttempts} intentos.`);
      }
      return;
    }

    if (recoveryEmail) {
      setRecoveryMessage(`Se ha enviado un enlace de recuperación a ${recoveryEmail}. Revisa tu bandeja de entrada.`);
      setRecoveryAttempts(prev => ({ ...prev, [recoveryEmail]: 0 }));
    } else {
      setError('Por favor, ingresa tu email para recuperar la contraseña.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-400 mb-2">Newenko</h1>
          <p className="text-gray-300 text-lg">Gestión de Agua Purificada</p>
        </div>
        
        {!showForgotPassword ? (
          <>
            <h2 className="text-2xl font-bold text-white text-center mb-6">Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="tu_correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6 flex items-end">
                <div className="flex-grow relative">
                  <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Contraseña:</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="ml-3 mb-1">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center justify-center w-10 h-10 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 hover:text-blue-400 hover:border-blue-500 transition-colors focus:outline-none"
                    title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-400 text-sm mb-4 text-center animate-pulse">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg transform hover:scale-105"
              >
                Entrar
              </button>
              <p className="text-center text-gray-400 text-sm mt-4">
                ¿Olvidaste tu contraseña? <button type="button" onClick={() => setShowForgotPassword(true)} className="text-blue-400 hover:underline focus:outline-none">Recuperar aquí</button>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white text-center mb-6">Recuperar Contraseña</h2>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label htmlFor="recoveryEmail" className="block text-gray-300 text-sm font-bold mb-2">Email de Recuperación:</label>
                <input
                  type="email"
                  id="recoveryEmail"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="tu_correo@ejemplo.com"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                <label className="block text-gray-300 text-sm font-bold mb-2">Verificación de Seguridad:</label>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-2xl font-bold tracking-widest select-none bg-gray-600 px-4 py-2 rounded-md">
                    {captchaValue}
                  </span>
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="text-blue-400 hover:underline text-sm focus:outline-none"
                  >
                    Recargar Captcha
                  </button>
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Ingresa el texto de arriba"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                />
                {captchaError && <p className="text-red-400 text-xs mt-2 animate-pulse">{captchaError}</p>}
              </div>

              {error && <p className="text-red-400 text-sm mb-4 text-center animate-pulse">{error}</p>}
              {recoveryMessage && <p className="text-green-400 text-sm mb-4 text-center">{recoveryMessage}</p>}
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg transform hover:scale-105"
              >
                Enviar Enlace de Recuperación
              </button>
              <p className="text-center text-gray-400 text-sm mt-4">
                <button type="button" onClick={() => setShowForgotPassword(false)} className="text-blue-400 hover:underline focus:outline-none">Volver al inicio de sesión</button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthLogin;