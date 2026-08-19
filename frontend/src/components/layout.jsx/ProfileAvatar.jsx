import React from "react";
import { User } from "lucide-react";

const ProfileAvatar = ({ user, size = "w-9 h-9" }) => {
    return (
        <div
            className={`${size} rounded-full overflow-hidden bg-[#1977BB] border border-[#288ED8] flex items-center justify-center text-white font-semibold`}
        >
            {user?.profile?.url ? (
                <img
                    src={user.profile.url}
                    alt={user.fullName || "Profile"}
                    className="w-full h-full object-cover"
                />
            ) : user?.fullName ? (
                user.fullName.charAt(0).toUpperCase()
            ) : (
                <User size={18} />
            )}
        </div>
    );
};

export default ProfileAvatar;