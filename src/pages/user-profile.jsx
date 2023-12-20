import ProfileSidebar from "@/components/profile/profile-sidebar";
import Head from "next/head";

const UserProfile = () => {
  return (
    <div>
      <Head>
        <title>User Profile</title>
      </Head>
      <div className="container my-5">
        <ProfileSidebar />
      </div>
    </div>
  );
};

export default UserProfile;
