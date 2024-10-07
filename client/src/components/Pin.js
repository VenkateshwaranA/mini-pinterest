import React, { useState } from "react";
import axios from "axios";

const Pin = ({ pin }) => {
  const [isFollowing, setIsFollowing] = useState(pin.isFollowing || false);
  const [isLike, setIsLike] = useState(false);
  let userId = JSON.parse(localStorage.getItem("user"))?._id;

  const handleLike = async () => {
    await axios
      .post(`http://localhost:3030/pins/${pin._id}/like`, { userId })

      .then((res) => {
        console.log("like", res);
        setIsLike(true);
      })
      .catch((err) => {
        console.log("err in like", err);
      });
  };

  const handleFollow = async () => {
    await axios
      .post("http://localhost:3030/users/follow", {
        followerId: JSON.parse(localStorage.getItem("user"))._id,
        userId: pin.owner?._id,
      })
      .then((res) => {
        console.log("ressss follow", res);
        setIsFollowing(true);
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  const handleUnfollow = async () => {
    await axios
      .post("http://localhost:3030/users/unfollow", {
        followerId: JSON.parse(localStorage.getItem("user"))._id,
        userId: pin.owner?._id,
      })
      .then((res) => {
        console.log("ressss unfollow", res);
        setIsFollowing(false);
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };
console.log('pin.likes.includes(userId) ?',isLike,pin.likes.length+1,pin.description);

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <img
        className="w-full h-48 object-cover"
        src={pin.imageUrl}
        alt={pin.description}
      />
      <div className="p-4 flex-1">
        <div className="font-bold text-lg mb-2">{pin.description}</div>
        <p className="text-gray-600 text-sm mb-4">{pin.tags.join(", ")}</p>
        <div className="flex items-center justify-between">
          {isLike || pin.likes.includes(userId) ? (
            <>
              <button
                className={`text-white  bg-blue-200
               rounded px-4 py-2 transition duration-300`}
              >
                Like
              </button>
              <span className="text-gray-500 font-bold text-base">
                Likes: { isLike ?pin.likes.length +1 : pin.likes.length}
              </span>
            </>
          ) : (
            <>
              <button
                onClick={handleLike}
                className={`text-white bg-blue-500
               rounded px-4 py-2 hover:bg-blue-600 transition duration-300`}
              >
                Like
              </button>
              <span className="text-gray-500 font-bold text-base">Likes: {pin.likes?.length}</span>
            </>
          )}

          {userId == pin.owner || isFollowing ? (
            <button
              onClick={() => handleUnfollow(pin.owner)}
              className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-300"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition duration-300"
            >
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Pin;
