import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
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

export const getAllJobs = async (filters) => {
  try {
    const jobs = [];
    const whereConditions = [];

    // Build where conditions
    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (value && value.trim() !== "") {
          whereConditions.push(where(key, "==", value));
        }
      });
    }

    // Construct query
    const baseRef = collection(fireDB, "jobs");
    const q = query(baseRef, ...whereConditions, orderBy("postedOn", "desc"));

    // Get data
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });

    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    console.error(error.message);
    return {
      success: false,
      message: "Something went wrong while fetching jobs",
    };
  }
};

export const applyJobPost = async (payload) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const job = payload;
    await addDoc(collection(fireDB, "applications"), {
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      userId: user.id,
      userName: user.name,
      email: user.email,
      phoneNumber: user?.phoneNumber || "",
      appliedOn: moment().format("DD-MM-YYYY HH:mm A"),
      status: "pending",
    });

    return {
      success: true,
      message: "Application successfull",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while applying for this jobs",
    };
  }
};

export const getApplicationsByUserId = async (userId) => {
  try {
    const applications = [];
    const qry = query(
      collection(fireDB, "applications"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while fetching applications",
    };
  }
};

export const getApplicationsByJobId = async (jobId) => {
  try {
    const applications = [];
    const qry = query(
      collection(fireDB, "applications"),
      where("jobId", "==", jobId)
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while fetching applications ",
    };
  }
};

export const getAllApplications = async () => {
  try {
    const applications = [];
    const qry = query(collection(fireDB, "applications"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while fetching applications",
    };
  }
};

export const changeApplicationStatus = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "applications", payload.id), {
      status: payload.status,
    });

    return {
      success: true,
      message: "Application status updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong while updating application status",
    };
  }
};
