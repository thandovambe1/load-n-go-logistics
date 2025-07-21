export default function Login() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <button className="bg-blue-500 px-4 py-2 rounded text-white w-full mb-4">Login with Google</button>
      <form className="space-y-4">
        <input type="email" placeholder="Email" className="border rounded px-4 py-2 w-full" />
        <input type="password" placeholder="Password" className="border rounded px-4 py-2 w-full" />
        <button className="bg-orange-500 px-4 py-2 rounded text-white w-full">Login</button>
      </form>
    </div>
  );
}
