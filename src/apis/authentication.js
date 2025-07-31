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

    const userData = querySnapshot.docs[0].data();
    const hashedInputPassword = CryptoJS.SHA256(payload.password).toString();
    const doPasswordsMatch = hashedInputPassword === userData.password;

    if (!doPasswordsMatch) {
      return {
        success: false,
        message: "Provided password is incorrect",
      };
    }
    const { password, ...cleanUserData } = userData;
    return {
      success: true,
      message: "Login successful",
      data: cleanUserData,
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

    if (querySnapshot.empty) {
      return {
        success: false,
        message: "Email already in use",
      };
    }

    const hashedPassword = CryptoJS.SHA256(payload.password).toString();
    const response = await addDoc(collection(fireDB, "users"), {
      ...payload,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "User registered successfully",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
