"use client";

import { useState } from "react";
import axios from "axios";
import { ImagePlus, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const Detection = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [probability, setProbability] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg")
    ) {
      setPreview(URL.createObjectURL(file));
      toast.success("Image uploaded successfully");
      setError(null);
      await getPrediction(file);
    } else {
      setError("Please Select a valid image file (png, jpg, jpeg)");
      toast.error("Invalid file type");
      setPreview(null);
    }
  };

  const rateLimit = 30000;
  let lastReqestTime = 0;

  const getPrediction = async (file: File) => {
    // Rate limit the requests
    const currentTime = Date.now();
    if (currentTime - lastReqestTime < rateLimit) {
      setError("Please wait before making another request.");
      toast.error("Please wait before making another request.");
      return;
    }
    setIsLoading(true);
    lastReqestTime = currentTime;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size too large. Maximum size is 10MB");
      toast.error("File size too large");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setIsLoading(true);
    setPrediction(null);
    setProbability(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000,
        }
      );
      const data = response.data;
      console.log(data);

      // Check for any potential errors in the response
      if (data.error) {
        setError(data.error);
        return;
      }

      setPrediction(data.predicted);
      setProbability(data.prediction);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          setError("Request timed out. The model took too long to respond.");
          toast.error("Request timed out");
        } else {
          setError(
            error.response?.data?.error ||
              "Failed to get prediction. Please try again."
          );
          toast.error("Prediction failed");
        }
      } else {
        setError("An unexpected error occurred");
        toast.error("Unexpected error");
      }
      console.error("Error fetching prediction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col xl:flex-row xl:justify-between xl:px-[250px] xl:py-4">
      <Toaster position="top-center" />
      {/* Image Uploader */}
      <label className="w-full xl:w-[400px] border border-black/40 dark:border-white/40 rounded-lg cursor-pointer">
        {!preview && (
          <div className="w-full h-full flex flex-col gap-2 justify-center items-center p-4">
            <ImagePlus className="w-6 h-6" />
            <p>Upload an Image</p>
          </div>
        )}
        {preview && (
          <div className="relative w-full h-[400px]">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="px-4 py-4 object-cover rounded-3xl"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>

      {/* Result */}
      <div className="w-full xl:w-[400px] border border-black/40 dark:border-white/40 p-4 my-8 xl:my-0 rounded-lg">
        {isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Loader2 className="animate-spin mr-2" />
            <p>Processing image...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 w-full h-full flex flex-col items-center justify-center">
            <p className="text-lg">{error}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-7 text-center">
            <div>
              <p className="font-bold text-xl leading-tight">Prediction:</p>
              <p className="text-sm">{prediction || "No prediction"}</p>
            </div>
            <div>
              <p className="font-bold text-xl leading-tight">Probability:</p>
              <p className="text-sm">
                {probability !== null
                  ? `${probability} / ${(probability * 100).toFixed(2)}%`
                  : "No probability"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detection;
