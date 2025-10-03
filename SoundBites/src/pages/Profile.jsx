function Profile() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-lg">Tên người dùng: <span className="text-blue-400">User123</span></p>
        <button className="mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600">
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
export default Profile;
