// Import necessary hooks
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="logout-button bg-red-500 text-white p-2 rounded"
    >
      Logout
    </button>
  );
}
