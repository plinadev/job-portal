import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../firebase.config";
import CryptoJS from "crypto-js";

export const loginUser = async (payload) => {
  try {
    const qry = query(
      collection(fireDB, "users"),
      where("email", "==", payload.email)
    );
    const querySnapshot = await getDocs(qry);

    if (querySnapshot.empty) {
      return {
        success: false,
        message: "User is not found",
      };
    }

    const doc = querySnapshot.docs[0];
    const userData = doc.data();
    const hashedInputPassword = CryptoJS.SHA256(payload.password).toString();
    const doPasswordsMatch = hashedInputPassword === userData.password;

    if (!doPasswordsMatch) {
      return {
        success: false,
        message: "Provided password is incorrect",
      };
    }

    const { password, ...cleanUserData } = userData;
    const userWithId = { id: doc.id, ...cleanUserData };

    localStorage.setItem("user", JSON.stringify(userWithId));

    return {
      success: true,
      message: "Login successful",
      data: userWithId,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const registerUser = async (payload) => {
  try {
    const qry = query(
      collection(fireDB, "users"),
      where("email", "==", payload.email)
    );
    const querySnapshot = await getDocs(qry);

    if (!querySnapshot.empty) {
      return {
        success: false,
        message: "Email already in use",
      };
    }

    const hashedPassword = CryptoJS.SHA256(payload.password).toString();
    const userDataToSave = {
      ...payload,
      password: hashedPassword,
    };

    const response = await addDoc(collection(fireDB, "users"), userDataToSave);

    const { password, ...cleanUserData } = userDataToSave;
    const userWithId = { id: response.id, ...cleanUserData };

    // ✅ Save to localStorage
    localStorage.setItem("user", JSON.stringify(userWithId));

    return {
      success: true,
      message: "User registered successfully",
      data: userWithId,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
