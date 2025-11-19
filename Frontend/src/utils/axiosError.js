import toast from "react-hot-toast"

const getErrorMessage = (error) => {
    toast.error (
        error?.response?.data?.message || error.message || "Internal Server Error"
    )
}

export default getErrorMessage;