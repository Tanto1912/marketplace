const ProfilePage = () => {
  return (
    <div className="max-w-6xl mx-auto mt-6 bg-white shadow-md rounded-md overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-60 bg-gradient-to-r from-pink-200 to-pink-300">
        <img
          src="/cover.jpg"
          alt="Cover"
          className="w-full h-full object-cover"
        />

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-6">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-white"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="mt-20 px-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-gray-600">Web Developer • Jakarta, Indonesia</p>
          </div>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-6 px-6 py-4 border-b border-gray-200 text-gray-600 font-semibold">
        <button className="hover:text-pink-600">Posts</button>
        <button className="hover:text-pink-600">About</button>
        <button className="hover:text-pink-600">Friends</button>
        <button className="hover:text-pink-600">Photos</button>
      </div>

      {/* Posts Section */}
      <div className="px-6 py-4 space-y-4">
        <div className="bg-gray-100 rounded-md p-4 shadow-sm">
          <h3 className="font-semibold text-lg">Just learned React!</h3>
          <p className="text-sm text-gray-600 mt-1">2 hours ago • 📍 Jakarta</p>
        </div>
        <div className="bg-gray-100 rounded-md p-4 shadow-sm">
          <h3 className="font-semibold text-lg">Working on a new project 🔥</h3>
          <p className="text-sm text-gray-600 mt-1">Yesterday • 📍 Bandung</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
