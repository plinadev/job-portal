import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { fireDB } from "../firebase.config";
import moment from "moment";

export const postNewJob = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    await addDoc(collection(fireDB, "jobs"), {
      ...payload,
      status: "pending",
      postedByUserId: user.id,
      postedByUserName: user.name,
      postedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Job posted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while posting a job",
    };
  }
};

export const getPostedJobsByUserId = async (userId) => {
  try {
    const jobs = [];

    const jobsRef = collection(fireDB, "jobs");
    const q = query(jobsRef, where("postedByUserId", "==", userId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });

    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while fetching jobs",
    };
  }
};

export const editJobDetails = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "jobs", payload.id), {
      ...payload,
      updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Job updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while updating a job",
    };
  }
};

export const getJobById = async (jobId) => {
  try {
    const jobRef = doc(fireDB, "jobs", jobId);
    const docSnap = await getDoc(jobRef);

    if (docSnap.exists()) {
      return {
        success: true,
        data: { id: docSnap.id, ...docSnap.data() },
      };
    } else {
      return {
        success: false,
        message: "No such job found",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while fetching the job",
    };
  }
};

export const deleteJob = async (jobId) => {
  try {
    await deleteDoc(doc(fireDB, "jobs", jobId));
    return {
      success: true,
      message: "Job deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
