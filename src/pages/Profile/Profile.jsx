import React, { useEffect, useState } from "react";
import "./profile.css";
import { useSelector, useDispatch } from "react-redux";
import { logOutuser } from "../../Redux/apiCall";
import { useNavigate } from "react-router-dom";
import placeholder from "../../Images/placeholder.png";
import Loading from "../../components/Loading/Loading";
import { BlobServiceClient } from "@azure/storage-blob";
import { MdDelete } from "react-icons/md";

// Import environment variable

function Profile() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.user);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [userImageUrl, setUserImageUrl] = useState(null); // Store the user-specific image URL

  let account = "taskminderimagestore";
  let sasToken =
    "sv=2022-11-02&ss=bf&srt=sco&sp=rwdlaciytfx&se=2023-08-10T14:42:42Z&st=2023-07-17T06:42:42Z&spr=https&sig=FSiYio%2FYQfHjjD8oHFyWiyXFYNuEpKSiDxqs4GP0sCc%3D";

  const containerName = "imagestore";

  const dispatch = useDispatch();
  const hadleLogOut = () => {
    logOutuser(dispatch);
    navigate("/login");
  };

  const fetchImages = async () => {
    try {
      setLoading(true);
      const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`
      );
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blobItems = containerClient.listBlobsFlat();

      let urls = [];
      for await (const blob of blobItems) {
        const imageUrl = `${blobServiceClient.url}${containerName}/${blob.name}`;
        urls.push({ name: blob.name, url: imageUrl });
      }
      setImageUrls(urls);
      setLoading(false);

      // Find the URL for the specific user and set it to the state
      const userImage = urls.find(
        (url) => url.name === `${userData.user_id}.png`
      );
      if (userImage) {
        setUserImageUrl(userImage.url);
      } else {
        setUserImageUrl(null);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return alert("File not exist");
    } else {
      try {
        setLoading(true);
        const blobName = `${userData.user_id}.png`; // Use the user's ID as the blob name
        const blobServiceClient = new BlobServiceClient(
          `https://${account}.blob.core.windows.net/?${sasToken}`
        );
        const containerClient =
          blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlockBlobClient(blobName);
        const result = await blobClient.uploadData(file, {
          blobHTTPHeaders: { blobContentType: file.type },
        });

        // Fetch the new images and find the URL for the specific user
        fetchImages();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const deleteImage = async (blobName) => {
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net/?${sasToken}`
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(blobName);
    const result = await blobClient.delete();
    fetchImages(); // Fetch the images again after deleting the image
  };

  return (
    <div className="profile_page">
      <h1 className="profile_title">Your Profile</h1>
      <div className="profile_wrapper">
        <div className="user_img">
          <form>
            <div className="file_upload">
              {file ? (
                <img
                  className=""
                  src={URL.createObjectURL(file)}
                  alt="no pic"
                />
              ) : userImageUrl ? (
                <img className="" src={userImageUrl} alt="profile pic" />
              ) : (
                <img className="displayImg" src={placeholder} alt="nopic" />
              )}
            </div>

            <div className="upload-form_inputs">
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="uploadimage"
              >
                Upload
              </button>

              {/* button to delete image */}
              {userImageUrl && (
                <button
                  onClick={() => deleteImage(userData.user_id + ".png")}
                  className="delbtn"
                >
                  <MdDelete className="del_profile" />
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="user_data">
          <p>User ID: {userData?.user_id}</p>
          <p>User Name: {userData?.username} </p>
          <p>Email:{userData?.email} </p>
          <p>Role: {userData?.role} </p>
        </div>
        <button onClick={hadleLogOut} className="logout">
          Logout
        </button>
      </div>
    </div>
  );
}
export default Profile;
