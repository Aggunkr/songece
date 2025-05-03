import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      await axios.post(`/api/auth/reset-password/${token}`, { password });
      setMessage('Parolanız başarıyla güncellendi.');
    } catch {
      setMessage('Bir hata oluştu.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Parola Sıfırlama</h2>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2" />
      <button onClick={handleReset} className="bg-blue-500 text-white px-4 py-2 ml-2">Sıfırla</button>
      <p className="mt-2">{message}</p>
    </div>
  );
}