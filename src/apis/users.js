import { doc, getDoc, updateDoc } from "firebase/firestore";
import { fireDB } from "../firebase.config";

export const updateUserProfile = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    await updateDoc(doc(fireDB, "users", user.id), payload);
    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while updating data",
    };
  }
};

export const getUserProfileData = async (userId) => {
  try {
    const docRef = doc(fireDB, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "No user profile data found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while getting profile data",
    };
  }
};
