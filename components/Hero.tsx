const Hero = () => {
  return (
    <div className="w-full px-0 xl:px-2 py-8">
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-4xl font-bold text-center">
            Brain Tumor Detection
          </h3>
          <span className="text-lg text-center">
            By Deep Learning CNN Algorithm
          </span>
          <p className="max-w-[800px] py-4 flex text-justify">
            Detecting brain tumors with precision is now more accessible than
            ever. Our cutting-edge deep learning model leverages Convolutional
            Neural Networks (CNNs) to classify brain MRI scans into four
            distinct categories: Glioma, Meningioma, Pituitary Tumor, and No
            Tumor. This innovative approach ensures high accuracy and
            efficiency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
