import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
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

export const getAllUsers = async () => {
  try {
    const users = [];

    const usersRef = collection(fireDB, "users");
    const querySnapshot = await getDocs(usersRef);

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return {
      success: true,
      data: users,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while fetching users",
    };
  }
};

export const updateUserProfileStatus = async (id, status) => {
  try {
    await updateDoc(doc(fireDB, "users", id), { id, status });
    return {
      success: true,
      message: "Status updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while updating user status",
    };
  }
};
